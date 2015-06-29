var express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
//var articles = [new Article(), new Article()];
    res.render('index', {});
});
