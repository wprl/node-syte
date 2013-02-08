var express = require('express');
var config = require('config');

var app = module.exports = express();

app.get('/', function (request, response, next) {
  response.render('index.html');
});

app.get('/about', function (request, response, next) {
  // TODO
});

app.get('/rss', function (request, response, next) {
  r.get(config.rss.feedUrl, function (error, response, body) {
    var newContent = body.replace(config.blog.tumblr.url, config.site.rootUrl.substring(7));
    response.json(newContent);
  });
});

