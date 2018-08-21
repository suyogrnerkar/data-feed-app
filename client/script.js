var $ = require("jquery");
var _ = require("lodash");

$(document).ready(function () {
  var page = $("table").data('page');
  $.get(window.location.href + "data?page=" + page, function (data) {
    localStorage.setItem('articles', JSON.stringify(data));
  });
});