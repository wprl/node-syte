var express = require('express');
var config = require('config');
var r = require('request');

var app = module.exports = express();

app.get('/:username', function (request, response, next) {
  var username = request.params.username;
  var twitterRequest = {
    url: config.services.twitter.api.url + '/statuses/user_timeline.json',
    qs: {
      include_rts: false,
      exclude_replies: true,
      count: 50,
      screen_name: username
    }
  };

  // TODO
  // twitter = OAuth1Service(
  //   name='twitter',
  //   consumer_key=settings.TWITTER_CONSUMER_KEY,
  //   consumer_secret=settings.TWITTER_CONSUMER_SECRET,
  //   request_token_url=settings.TWITTER_API_URL + 'oauth/request_token',
  //   access_token_url=settings.TWITTER_API_URL + 'oauth/access_token',
  //   authorize_url=settings.TWITTER_API_URL + 'oauth/authorize',
  //   header_auth=True)

  r.get(twitterRequest).pipe(response);
});
