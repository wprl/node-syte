// Dependencies
// ------------
var http = require('http');
var path = require('path');
var express = require('express');
var config = require('config');

var controllers = require('./controllers');

// Create the main app
var app = module.exports = express();

// Configure Express
// -----------------
app.use(express.logger('dev'));
app.use(express.errorHandler());
app.use(express.compress());
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

// TODO custom 404/500
// handler404 = 'syte.views.home.page_not_found_error'
// handler500 = 'syte.views.home.server_error'

// Controllers
Object.keys(config.services).forEach( function (serviceName) {
  var service = config.services[serviceName];
  if (!service.enabled) return;
  app.use('/' + serviceName + '/:username', controllers[serviceName]);
});

// TODO more controllers

// #Github Integration
// if settings.GITHUB_OAUTH_ENABLED:
//     urlpatterns += patterns('',
//         url(r'^github/auth/?$', 'syte.views.github.github_auth'),
//     )

// #Foursquare Integration
// if settings.INSTAGRAM_OAUTH_ENABLED:
//     urlpatterns += patterns('',
//         url(r'^instagram/auth/?$', 'syte.views.instagram.instagram_auth'),
//     )

// #Sitemap
// if settings.SITEMAP_ENABLED:
//     urlpatterns += patterns('',
//         (r'^sitemap\.xml$', direct_to_template,
//             {'template': 'sitemap.xml', 'mimetype': 'application/xml'})
//         )

// Use the app's router after all other middleware
app.use(app.router);

// Start the app if not being used as a mounted app
if (!module.parent) {
  app.set('port', process.env.PORT || config.site.port);
  app.listen(app.get('port'));
}
