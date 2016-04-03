global.appRoot = __dirname;

var   http = require('http'),
      path = require('path'),
      app= require('./api/app');

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
