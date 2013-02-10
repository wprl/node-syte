// Dependencies
// ------------
var http = require('http');
var path = require('path');
var express = require('express');
var config = require('config');
var consolidate = require('consolidate');
var swig = require('swig');

// Create the main app
var app = module.exports = express();

// Initialize swig
swig.init({
  root: app.get('views'),
  allowErrors: true
});

// Express Settings
// ----------------
app.engine('html', consolidate.swig);

app.set('view engine', 'html');

// Express Middleware
// -----------------
app.use(express.logger('dev'));
app.use(express.errorHandler());
app.use(express.compress());
app.use(express.favicon());
app.use(express.bodyParser());
app.use('/static', express.static(path.join(__dirname, 'static')));

// TODO custom 404/500 pages

// Pages (Non-Service Mounted Apps)
app.use('/', require('./pages/home'));

// Services
Object.keys(config.services).forEach( function (name) {
  var service = config.services[name];
  if (!service.enabled) return;
  app.use('/' + name, require('./services/' + name));
});

// Sitemap
// TODO // if (config.sitemap.enabled) app.use('/sitemap.xml', sitemap);

// Start the app if not being used as a mounted app
if (!module.parent) {
  app.set('port', process.env.PORT || config.site.port);
  app.listen(app.get('port'));
}
