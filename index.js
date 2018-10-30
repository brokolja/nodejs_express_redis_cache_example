var express = require('express');
var app = express();
var cache = require('express-redis-cache')({
  host: REDIS_HOST || "localhost", port: REDIS_PORT || 6379, expire: 60
  });

cache.on('message', function (message) {
  console.log("cache messege: ",message)
});

cache.on('connected', function () {
  console.log("cache connected")
});

cache.on('disconnected', function () {
  console.log("cache disconnected")
});

app.get('/', cache.route(), function (req, res) {
  res.send('Hello World! We are shipping Nodejs-Version: ' + process.version);
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port:' + (process.env.PORT || 8080));
});