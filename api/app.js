var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    config=require('./config');

var app = global.app = express();

app.set('port', process.env.PORT || config.port);
app.use(express.static(path.join(global.appRoot, config.webdir)));
app.use(bodyParser());

require('./routers/bookmark-route');

module.exports=app;
