var articlesData = require('./data/articles.json');
var moreData = require('./data/more-articles.json');


function getData(state) {
  if (state == 'init') {
    return articlesData;
  } else {
    return moreData;
  }
}

var model = {
  getData: getData
};

module.exports = model;