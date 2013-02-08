var express = require('express');
var config = require('config');
var r = require('request');

var app = module.exports = express();

app.get('/', function (request, response, next) {
  var userRequest = {
    url: config.services.instagram.api.url + 'users/'
      + config.services.instagram.userId,
    qs: {
      access_token: config.services.instagram.accessToken
    }
  };
  var mediaRequest = {
    url: config.services.instagram.api.url + 'users/'
      + config.services.instagram.userId + '/media/recent/',
    qs: {
      access_token: config.services.instagram.accessToken
    }
  };

  r.get(userRequest, function (error, response, user_data) {
    if (error) return next(new Error(error));

    r.get(mediaRequest, function (error, response, media_data) {
      if (error) return next(new Error(error));

      var context = {
        'user': user_data.data || undefined,
        'media': media_data.data || undefined,
        'pagination': media_data.pagination || undefined
      };

      response.json(context);
    });
  });
});

// TODO what route?
app.get('/next/:maxId', function (request, response, next) {
  var mediaRequest = {
    url: config.services.instagram.api.url + 'users/'
      + config.services.instagram.userId + '/media/recent/',
    qs: {
      access_token: config.services.instagram.accessToken,
      max_id: request.params.maxId
    }
  };

  r.get(mediaRequest, function (error, response, media_data) {
    if (error) return next(new Error(error));
    var context = {
      'media': media_data.data || undefined,
      'pagination': media_data.pagination || undefined
    };
    response.json(context);
  });
});

// def instagram_auth(request):
//   context = dict()
//   code = request.GET.get('code', None)
//   error = request.GET.get('error_description', None)

//   if not code and not error:
//     return redirect('{0}?client_id={1}&redirect_uri={2}instagram/auth/&response_type=code'.format(
//       settings.INSTAGRAM_OAUTH_AUTHORIZE_URL,
//       settings.INSTAGRAM_CLIENT_ID,
//       settings.SITE_ROOT_URI))

//   if code:
//     r = requests.post(settings.INSTAGRAM_OAUTH_ACCESS_TOKEN_URL, data={
//       'client_id': settings.INSTAGRAM_CLIENT_ID,
//       'client_secret': settings.INSTAGRAM_CLIENT_SECRET,
//       'grant_type': 'authorization_code',
//       'redirect_uri': '{0}instagram/auth/'.format(settings.SITE_ROOT_URI),
//       'code': code,
//     })

//     data = json.loads(r.text)
//     error = data.get('error_message', None)

//     if not error:
//       context['token'] = data['access_token']
//       context['user_id'] = data['user'].get('id', None)
//       context['user_name'] = data['user'].get('full_name', None)

//   if error:
//     context['error'] = error

//   return render(request, 'instagram_auth.html', context)



