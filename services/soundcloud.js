var express = require('express');
var config = require('config');
var r = require('request');

var app = module.exports = express();

app.get('/:username', function (request, response, next) {
  var username = request.params.username;
  var profileRequest = {
    url: config.services.soundcloud.api.url + 'users/' + username + '.json',
    qs: {
      client_id: config.services.soundcloud.clientId
    }
  };
  var tracksRequest = {
    url: config.services.soundcloud.api.url + 'users/' + username + '/tracks.json',
    qs: {
      client_id: config.services.soundcloud.clientId
    }
  };

  r.get(profileRequest, function (error, response, user_profile) {
    if (error) return next(new Error(error));

    r.get(tracksRequest, function (error, response, user_tracks) {
      if (error) return next(new Error(error));

      var context = {
        'user_profile': user_profile,
        'user_tracks': {
          'tracks': user_tracks,
          'show_artwork': config.services.soundcloud.showArtwork,
          'player_color': config.services.soundcloud.playerColor
        }
      };

      response.json(context);
    });
  });
});
