var $ = require("jquery");
var _ = require("lodash");
var timeSince = require('../utils/dataTimeUtils.js');
require('tablesorter');

$(document).ready(function () {

  var page = $("#articlesList").attr('data-page');
  $("#articlesList")
    .on('sortEnd', function () {
      localStorage.setItem('sortParams', JSON.stringify(this.config.sortList));
    })
    .tablesorter({
      sortList: JSON.parse(localStorage.getItem('sortParams')),
      headers: {
        0: { sorter: false },
        1: { sorter: false },
        2: { sorter: false },
        5: { sorter: false },
        6: { sorter: false }
      }
    });

  $.get(window.location.href + "data?page=" + page, function (data) {
    localStorage.setItem('articles', JSON.stringify(data));
  });

  $("#loadMore").on('click', function () {
    var ARTICLES_PER_PAGE = $("#articlesList").data('articles-per-page');
    var pageToGet = parseInt($("#articlesList").attr('data-page')) + 1;
    var localData = JSON.parse(localStorage.getItem('articles'));
    var nextPageData = {};

    // console.log(pageToGet * ARTICLES_PER_PAGE, localData.data.length + ARTICLES_PER_PAGE);

    var promise = new Promise(function (resolve, reject) {
      if ((pageToGet * ARTICLES_PER_PAGE) < (localData.data.length + ARTICLES_PER_PAGE)) {
        // console.log(ARTICLES_PER_PAGE, pageToGet, localData, nextPageData);
        nextPageData =
          _.slice(localData.data,
            (pageToGet - 1) * ARTICLES_PER_PAGE,
            (pageToGet - 1) * ARTICLES_PER_PAGE + ARTICLES_PER_PAGE);
        resolve(nextPageData);
      }
      else {
        $.get(window.location.href + "data?page=" + pageToGet, function (data) {
          nextPageData = data.data;
          if (nextPageData.length < ARTICLES_PER_PAGE) {
            $("#loadMore").attr("disabled", "disabled");
          }
          resolve(nextPageData);
        });
      }
    });

    promise.then(function (data) {
      if (nextPageData.length != 0) {
        for (let article of nextPageData) {
          $('#articlesList tr:last').after(
            `<tr>
          <td> <img src="${article.image}" class='articleImg'/> </td>
          <td> ${article.title} </td>
          <td> ${article.profile.first_name + " " + article.profile.last_name} </td>
          <td> ${article.words} </td>
          <td> ${timeSince(new Date(article.publish_at))} ago</td>
          <td> ${article.shares} </td>
          <td> ${article.views} </td>
        </tr>`);
        }
      }
      $("#articlesList").trigger("update");
    });

    $("#articlesList").attr('data-page', pageToGet);

  });

});