var express = require('express');
var config = require('config');
var r = require('request');

var app = module.exports = express();

app.get('/:username', function (request, response, next) {
  var username = request.params.username;
  var idRequest = {
    url: 'http://steamcommunity.com/id/' + username + '/games',
    qs: {
      tab: 'all',
      xml: 1
    }
  };

  // Make request to steamcommunity.com with the username
  // to get the 64-bit Steam ID
  r.get(idRequest, function (error, response, username_r) {
    if (error) return next(new Error(error));

    // TODO XML :(
    var steamid = username_r.getElementsByTagName('steamID64')[0].firstChild.wholeText)
    var totalgames = username_r.getElementsByTagName('game').length
    var payload = {'key': settings.STEAM_API_KEY, 'steamids': steamid}

    var userRequest = {
      url: config.services.steam.api.url + '/GetPlayerSummaries/v0002/',
      qs: {
        key: config.services.steam.api.key,
        steamids: steamid
      }
    };

    var friendsRequest = {
      url: config.services.steam.api.url + '/GetFriendList/v0001/',
      qs: {
        key: config.services.steam.api.key,
        steamids: steamid
      }
    };

    // Get user details from Steam API
    r.get(userRequest, function (error, response, user_r) {
      if (error) return next(new Error(error));

      user_data = json.loads(user_r.text);

      r.get(friendsRequest, function (error, response, user_friends) {
        if (error) return next(new Error(error));

        var recent_games = {};
        var games_array = [];
        var context;

        // Add number of games and friends to user data
        user_data.response.players.forEach( function (i, player) {
          // TODO XML :(
          var gamecount = username_r.getElementsByTagName('game').length;
          var friendcount = user_friends.friendslist.friends.length;
          var recent_games_nodelist = username_r.getElementsByTagName('hoursLast2Weeks');


          player.gamecount = gamecount;
          player.friendcount = friendcount;

          if (player.personastate === 0) {
            player.personastate = "Offline";
          }
          else if (player.personastate === 1) {
            player.personastate = "Online";
          }
          else if (player.personastate === 2) {
            player.personastate = "Busy";
          }
          else if (player.personastate === 3) {
            player.personastate = "Away";
          }
          else if (player.personastate === 4) {
            player.personastate = "Snooze";
          }
          else if (player.personastate === 5) {
            player.personastate = "Looking to trade";
          }
          else if (player.personastate === 6) {
            player.personastate = "Looking to play";
          }
        });

        // Get recently played games from different XML source and make into JSON object
        recent_games_nodelist.forEach( function (i, recent_game) {
          // TODO XML :(
          var game = recent_game.parentNode;
          var game_data = {
            name: game.getElementsByTagName('name').item(0).firstChild.nodeValue,
            logo: game.getElementsByTagName('logo').item(0).firstChild.nodeValue,
            storeLink: game.getElementsByTagName('storeLink').item(0).firstChild.nodeValue,
            hoursLast2Weeks: game.getElementsByTagName('hoursLast2Weeks').item(0).firstChild.nodeValue,
            hoursOnRecord: game.getElementsByTagName('hoursOnRecord').item(0).firstChild.nodeValue
          }
          games_array.push(game_data);
        })

        recent_games.games = games_array

        context = {
          user: user_data.response.players[0],
          recent_games: games_array
        };

        response.json(context);
      });
    });
  });
});
