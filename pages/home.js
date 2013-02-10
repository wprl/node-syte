var express = require('express');
var config = require('config');
var path = require('path');

var app = module.exports = express();

app.get('/', function (request, response, next) {
  response.render('index.html', {COMPRESS_REVISION_NUMBER: '1.0'}); // TODO send real data from config
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
