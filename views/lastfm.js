var express = require('express');
var config = require('config');
var r = require('request');

var app = module.exports = express();

app.get('/:username', function (request, response, next) {
  var username = request.params.username;
  var tracksRequest = {
    url: config.services.lastfm.api.url,
    qs: {
      method: 'user.getrecenttracks',
      user: username,
      api_key: config.services.lastfm.api.key,
      format: 'json'
    }
  };
  var userRequest = {
    url: config.services.lastfm.api.url,
    qs: {
      method: 'user.getinfo',
      user: username,
      api_key: config.services.lastfm.api.key,
      format: 'json'
    }
  };

  r.get(tracksRequest, function (error, response, tracks) {
    if (error) return next(new Error(error));

    r.get(userRequest, function (error, response, user) {
      if (error) return next(new Error(error));

      var context = {
        'user_info': user.json,
        'recenttracks': tracks.json,
      };

      response.json(context);
    });
  });
});
