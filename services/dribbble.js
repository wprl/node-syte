var express = require('express');
var config = require('config');
var r = require('request');

var app = module.exports = express();

// Routes
// ------
app.get('/:username', function (request, response, next) {
  var dribbbleUrl = config.services.settings.blog.dribbble.api.url + '/'
    + username + '/shots';

  r.get(dribbbleUrl).pipe(response);
});
