var express = require('express'),
  router = express.Router(),
  UntappdClient = require("node-untappd"),
  moment = require("moment"),
    _ = require("underscore"),
  cache = require('memory-cache');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {

  if(process.env.untappdkey == undefined
    || process.env.untappdkey == null
    || process.env.untappdsecret == undefined
    || process.env.untappdsecret == null ){
    return res.render('index',{});
  }
  var cacheCheck = cache.get('checkin');
  if(cacheCheck != null){
    return res.render('index', {beer:cacheCheck});
  }
  var untappd = new UntappdClient(false);
    untappd.setClientId(process.env.untappdkey);
    untappd.setClientSecret(process.env.untappdsecret);

    untappd.userFeed(function(err,obj){
      var validCheckin = null;
     obj.response.checkins.items.forEach(function(checkin){
          console.log(checkin);
          if(validCheckin == null){
            var checkinTime = moment.utc(checkin.created_at);
            var now = moment.utc().add(-3, 'hours');
            if(checkinTime > now){
              validCheckin = checkin.beer.beer_name;
            }
          }
      });
      cache.put('checkin', validCheckin, 600000)
      res.render('index', {beer: validCheckin})
  },"tparnell");


});
