var express = require('express');
var router = express.Router();
var model = require('../model/model');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', data: model.getData('init') });
});

module.exports = router;
