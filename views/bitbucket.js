var express = require('express');
var r = require('request');

var app = module.exports = express();

app.get('/:username', function (request, response, next) {
  var username = request.params.username;
  var userUrl = config.services.bitbucket.api.url + 'users/' + username + '/';

  r.get(baseUrl, function (error, response, body) {
    if (error) return next(new Error(error));

    var followersUrl = config.services.bitbucket.api.url + 'users/' + username + '/followers/';

    r.get(followersUrl, function (error, response, followers) {
      if (error) return next(new Error(error));

      var done = function done () { response.json(body); }
      var reposCount = body.repositories.length;

      body.user.followers = followers.count;
      body.user.public_repos = body.repositories.length;

      body.repositories.sort( function (a, b) {
        return a.utc_lastupdated - b.utc_lastupdated;
      });

      body.repositories.forEach( function (i, repo) {
        var forksUrl = config.services.bitbucket.api.url + 'repositories/' + username + '/' + repo.slug;
        repo.language = repo.language.toUpperCase();
      });

      if (!config.services.bitbucket.showForks) return done();

      body.repositories.forEach( function (i, repo) {
        r.get(forksUrl, function (error, response, forks) {
          if (error) return next(new Error(error));

          reposCount--;
          repo.forks_count = forks.forks_count;
          if (reposCount === 0) done();
        });
      }
    });
  });
});

