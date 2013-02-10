var express = require('express');
var config = require('config');
var r = require('request');

var app = module.exports = express();

app.get('/:username', function (request, response, next) {
  var username = request.params.username;
  var userRequest = {
    url: config.services.foursquare.api.url + 'users/self',
    qs: {
      oauth_token: config.services.foursquare.accessToken ,
      v: 20120812
    }
  };
  var checkinsRequest = {
    url: config.services.foursquare.api.url + 'users/self/checkins',
    qs: {
      oauth_token: config.services.foursquare.accessToken ,
      v: 20120812
    }
  };

  r.get(userRequest, function (error, response, user_data) {
    var user_response = user_data.response || {};
    var user_info = user_response.user || undefined;

    r.get(userRequest, function (error, response, checkins_data) {
      var checkins_response = checkins_data.response || {};
      var checkins = checkins_response.checkins || undefined;
      var now = new Date();
      var validCheckins;
      var context;

      if (!config.services.foursquare.showCurrentDay) {

        checkins.items.forEach( function (i, item) {
          var created_at = item.createdAt || undefined;
          var created_at_dt;

          if (created_at) {
            created_at_dt = datetime.datetime.fromtimestamp(int(created_at)); // TODO
            if ((now - created_at_dt) > datetime.timedelta(days=1)) { // TODO
              valid_checkins.push(item);
            }
          }
        });

        checkins.items = valid_checkins;
      }

      context = {'user': user_info, 'checkins': checkins};

      response.json(context);
    });
  });
});

// TODO
// #Foursquare Integration
// if settings.INSTAGRAM_OAUTH_ENABLED:
//     urlpatterns += patterns('',
//         url(r'^instagram/auth/?$', 'syte.views.instagram.instagram_auth'),
//     )
// def foursquare_auth(request):
//   context = dict()
//   code = request.GET.get('code', None)
//   error = request.GET.get('error', None)

//   if not code and not error:
//     return redirect('{0}?client_id={1}&redirect_uri={2}foursquare/auth/&response_type=code'.format(
//       settings.FOURSQUARE_OAUTH_AUTHORIZE_URL,
//       settings.FOURSQUARE_CLIENT_ID,
//       settings.SITE_ROOT_URI))

//   if code:
//     r = requests.post(settings.FOURSQUARE_OAUTH_ACCESS_TOKEN_URL, data={
//       'client_id': settings.FOURSQUARE_CLIENT_ID,
//       'client_secret': settings.FOURSQUARE_CLIENT_SECRET,
//       'grant_type': 'authorization_code',
//       'redirect_uri': '{0}foursquare/auth/'.format(settings.SITE_ROOT_URI),
//       'code': code,
//     })

//     data = json.loads(r.text)
//     error = data.get('error', None)

//     if not error:
//       context['token'] = data['access_token']

//   if error:
//     context['error'] = error

//   return render(request, 'foursquare_auth.html', context)
