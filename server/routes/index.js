var express = require('express');
var router = express.Router();
var model = require('../model/model');
var _ = require('lodash');
var ARTICLES_PER_PAGE = 10;
var timeSince = require('../../utils/dataTimeUtils');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Posts Demo App',
    data: _.take(model.getData('init'), ARTICLES_PER_PAGE),
    page: 0,
    articlesPerPage: ARTICLES_PER_PAGE
  });
});

router.get('/data', function (req, res, next) {

  var page = parseInt(req.query.page);
  var articles = model.getData('init'), jsonResp = {};

  if ((page * ARTICLES_PER_PAGE) < articles.length) {
    jsonResp = _.takeRight(articles, articles.length - ARTICLES_PER_PAGE);
  }
  else {
    var pageCountCalculated = _.floor((page * ARTICLES_PER_PAGE - articles.length) / 10);
    jsonResp = _.slice(model.getData(''),
      pageCountCalculated * ARTICLES_PER_PAGE,
      pageCountCalculated * ARTICLES_PER_PAGE + ARTICLES_PER_PAGE);
  }
  res.json({ data: jsonResp });
});

module.exports = router;
