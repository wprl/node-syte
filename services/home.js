var express = require('express');
var config = require('config');
var path = require('path');
var consolidate = require('consolidate');

var app = module.exports = express();

app.engine('html', consolidate.swig);

app.set('view engine', 'html');
app.set('views', path.join(__dirname, '..', 'templates'));

app.get('/', function (request, response, next) {
  response.render('index.html', {});
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

