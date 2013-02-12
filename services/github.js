var express = require('express');
var config = require('config');
var r = require('request');
var _ = require('underscore');

var app = module.exports = express();

app.get('/auth', function auth (request, response, next) {
  if (!config.services.github.oauth.enabled) return response.send(404);

  var code = request.query.code;
  var errorDescription = request.query.error_description;
  var oauthRequest = {
    url: config.services.github.oauth.accessTokenUrl,
    qs: {
      client_id: config.services.github.oauth.client.id,
      client_secret: config.services.github.oauth.client.secret,
      redirect_uri: config.site.rootUrl + 'github/auth/',
      code: code
    }
  };
  var redirectUrl = config.services.github.oauth.authorizeUrl + '?client_id='
    + config.services.github.oauth.client.id + '&redirect_uri='
    + config.site.rootUrl + 'github/auth/&response_type=code';

  if (!code && !errorDescription) return response.redirect(redirectUrl);

  r.post(oauthRequest, function (error, postResponse, body) {
    if (error) return next(new Error(error));

    var context = {
      token: body.access_token,
      error: body.error
    };

    _.extend(context, config);

    response.render('github_auth.html', context);
  });
});

app.get('/:username', function (request, response, next) {
  var username = request.params.username;
  var userRequest = {
    url: config.services.github.api.url + 'users/' + username,
    qs: {
      access_token: config.services.github.accessToken
    }
  };
  var reposRequest = {
    url: config.services.github.api.url + 'users/' + username + '/repos',
    qs: {
      access_token: config.services.github.accessToken
    }
  };

  r.get(userRequest, function (error, getResponse, user) {
    if (error) return next(new Error(error));

    r.get(reposRequest, function (error, getResponse, repos) {
      if (error) return next(new Error(error));

      var content = {
        user: user,
        repos: repos.sort( function (a, b) { a.updated_at - b.updated_at })
      };

      response.json(content);
    });
  });
});
