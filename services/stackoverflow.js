var express = require('express');
var config = require('config');
var r = require('request');

var app = module.exports = express();

app.get('/:userId', function (request, response, next) {
  var userId = request.params.userId;
  var userRequest = {
    url: config.services.stackoverflow.api.url + 'users/' + userId,
  };
  var timelineRequest = {
    url: config.services.stackoverflow.api.url + 'users/' + userId + '/timeline',
  };

  r.get(userRequest, function (error, response, user_r) {
    if (error) return next(new Error(error));

    r.get(timelineRequest, function (error, response, timeline_r) {
      if (error) return next(new Error(error));


      var context = {
        user: user_r.users[0],
        timeline: timeline_r.user_timelines
      };

      response.json(context);
    });
  });
});
