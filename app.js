

var express = require('express'),
  config = require('./config/config');

var app = express();

require('./config/express')(app, config);

app.listen(process.env.PORT || config.port);
