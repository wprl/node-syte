var rootUrl = "http://127.0.0.1:7777/";
var tumblrUrl = "[enter tumblr blog url] ex. rigoneri.tumblr.com";
var wordpressUrl = "[enter wordpress blog url] ex. gordonkoo.wordpress.com";

module.exports = {
  "compress": {
    "revision": "1.0"
  },
  "services": {
    "blog": {
      "enabled": true,
      "platform": "tumblr",
      "tumblr": {
        "url": tumblrUrl,
        "api": {
          "url": "http://api.tumblr.com/v2/blog/" + tumblrUrl,
          "key": "[enter tumblr api key here, see tumblr setup instructions]"
        }
      },
      "wordpress": {
        "url": wordpressUrl,
        "api": {
          "url": "https://public-api.wordpress.com/rest/v1/sites/" + wordpressUrl
        }
      }
    },
    "rss": {
      "enabled": false,
      "url": "http://" + tumblrUrl + "/rss"
    },
    "twitter": {
      "enabled": false,
      "url": "https://api.twitter.com/",
      "consumer": {
        "key": "[enter twitter consumer key here, see twitter setup instructions]",
        "secret": "[enter twitter consumer secret here, see twitter setup instructions]"
        },
      "user": {
        "key":"[enter twitter user key here, see twitter setup instructions]",
        "secret": "[enter twitter user secret here, see twitter setup instructions]"
      }
    },
    "github": {
      "enabled": false,
      "api": {
        "url": "https://api.github.com/",
        "token": "[enter github access token here, see github setup instructions]"
      },
      "oauth": {
        "enabled": false,
        "client": {
          "id": "[enter github client id here, see github setup instructions]",
          "secret": "[enter github client secret here, see github setup instructions]",
        },
        "authorizeurl": "https://github.com/login/oauth/authorize",
        "accesstokenurl": "https://github.com/login/oauth/access_token"
      }
    },
    "stackoverflow": {
      "enabled": false,
      "api": { "url": "http://api.stackoverflow.com/1.1/" }
    },
    "dribbble": {
      "enabled": false,
      "api": { "url": "http://api.dribbble.com/players/" }
    },
    "instagram": {
      "enabled": false,
      "api": {
        "url": "https://api.instagram.com/v1/",
        "token": "[enter instagram access token here, see instagram setup instructions]"
      },
      "userid": "[enter instagram user_id here, see instagram setup instructions]",
      "oauth": {
        "enabled": false,
        "authorizeurl": "https://api.instagram.com/oauth/authorize",
        "accesstokenurl": "https://api.instagram.com/oauth/access_token"
      },
      "client": {
        "id": "[enter instagram client_id here, see instagram setup instructions]",
        "secret": "[enter instagram client_secret here, see instagram setup instructions]"
      }
    },
    "foursquare": {
      "enabled": false,
      "api": {
        "url": "https://api.foursquare.com/v2/",
      },
      "accessToken": "[enter foursquare access token here, see foursquare setup instructions]",
      "showCurrentDay": true,
      "oauth": {
        "enabled": false,
        "authorizeUrl": "https://foursquare.com/oauth2/authenticate",
        "accessTokenUrl": "https://foursquare.com/oauth2/access_token"
      },
      "client": {
        "id": "[enter foursquare client_id here, see foursquare setup instructions]",
        "secret": "[enter foursquare client_secret here, see foursquare setup instructions]"
      }
    },
    "googleAnalytics": {
      "trackingId": ""
    },
    "shareThis": {
      "publisherKey": ""
    },
    "woopra": {
      "domain": "",
      "timeout": 300000,  //5 minutes
      "includeQuery": false
    },
    "disqus": {
      "enabled": false,
      "shortname": ""
    },
    "lastfm": {
      "enabled": false,
      "api": {
        "url": "http://ws.audioscrobbler.com/2.0/",
        "key": "[enter lastfm api_key here, see lastfm setup instructions]"
      }
    },
    "soundcloud": {
      "enabled": false,
      "api": {
        "url": "https://api.soundcloud.com/"
      },
      "clientId": "[enter soundcloud application client_id here]",
      "showArtwork": false,
      "playerColor": "ff912b"
    },
    "bitbucket": {
      "enabled": false,
      "api": {
        "url": "https://api.bitbucket.org/1.0/"
      },
      "showForks": false
    },
    "tent.io": {
      "enabled": false,
      "entityUrl": "[enter your entity uri here] ex. https://yourname.tent.is",
      "feedUrl": "[enter a url to your feed] ex. https://yourname.tent.is"
    },
    "steam": {
      "enabled": false,
      "api": {
        "url": "http://api.steampowered.com/isteamuser",
        "key": "[enter your steam api key here, see steam setup instructions]"
      }
    },
  },
  "sitemap":{
    "enabled": false
  },
  "debug": true,
  "site": {
    "rootUrl": rootUrl,
    "port": 7777
  },
  "mediaUrl": rootUrl + "static/"
};
