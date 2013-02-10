var express = require('express');
var config = require('config');
var r = require('request');

var app = module.exports = express();

app.get('/:username', function (request, response, next) {
  var username = request.params.username;
  var twitterRequest = {
    json: true,
    url: config.services.twitter.api.url + '1/statuses/user_timeline.json',
    qs: {
      include_rts: false,
      exclude_replies: true,
      count: 50,
      screen_name: username
    },
    oauth: {
      consumer_key: config.services.twitter.consumer.key,
      consumer_secret: config.services.twitter.consumer.secret,
      token: config.services.twitter.user.key,
      token_secret: config.services.twitter.user.secret
    }
  };

  r.get(twitterRequest).pipe(response);
});
