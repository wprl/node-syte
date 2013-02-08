var r = require('request');
var config = require('config');

var routes = module.exports = {};

routes.main = function main (request, response, next) {
    var userUrl = config.services.github.api.url +'users/' + username
        + '?access_token=' + config.services.github.accessToken;
    var reposUrl = config.services.github.api.url +'users/' + username
        + '/repos?access_token=' + config.services.github.accessToken;

    r.get(userUrl, function (error, response, user) {
        if (error) return next(new Error(error));

        r.get(reposUrl, function (error, response, repos) {
            if (error) return next(new Error(error));

            var content = {
                user: user,
                repos: repos.sort( function (a, b) { a.updated_at < b.updated_at })
            }

            response.json(content);
        }
    }
}

routes.auth = function auth (request, response, next) {
    context = dict()
    code = request.GET.get('code', None)
    error = request.GET.get('error_description', None)

    if not code and not error:
        return redirect('{0}?client_id={1}&redirect_uri={2}github/auth/&response_type=code'.format(
            settings.GITHUB_OAUTH_AUTHORIZE_URL,
            settings.GITHUB_CLIENT_ID,
            settings.SITE_ROOT_URI))

    if code:
        r = requests.post(settings.GITHUB_OAUTH_ACCESS_TOKEN_URL, data={
            'client_id': settings.GITHUB_CLIENT_ID,
            'client_secret': settings.GITHUB_CLIENT_SECRET,
            'redirect_uri': '{0}github/auth/'.format(settings.SITE_ROOT_URI),
            'code': code,
        }, headers={'Accept': 'application/json'})

    try:
    data = r.json
    error = data.get('error', None)
    except:
    error = r.text

    if not error:
        context['token'] = data['access_token']

    if error:
        context['error'] = error

    return render(request, 'github_auth.html', context)
