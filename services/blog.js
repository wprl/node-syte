var express = require('express');
var r = require('request');

var app = module.exports = express();

// Private Members
// ---------------

// TODO
// class MLStripper(HTMLParser):
//   def __init__(self):
//     self.reset()
//     self.fed = []
//   def handle_data(self, d):
//     self.fed.append(d)
//   def get_data(self):
//     return ''.join(self.fed)

// function strip_tags (html) {
//   s = MLStripper()
//   s.feed(html)
//   return s.get_data()
// }

// Takes a response (e.g. from Wordpress) and converts it into a format that
// will be accepted by the Handlebars templates
function convertWordpressResponse (post) {
  post.id = post.ID;
  post.body = post.content;
  post.tags = [];

  var f_date;
  var date = post.date;
  var pos = date.lastIndexOf('+'); // rfind === lastIndexOf?
  if (pos > 0) date = date.substring(0, pos);
  else {
    pos = date.lastIndexOf('-');
    date = date.substring(0, pos);
  }

  f_date = datetime.strptime(date, '%Y-%m-%dT%H:%M:%S');
  post.formated_date = f_date.strftime('%B %d, %Y');

  if (post.type === 'post') post.type = 'text';
}

// Routes
// ------
app.get('/post/:postId', function (request, response, next) {
  var tumblrRequest = {
    url: config.services.settings.blog.tumblr.api.url + '/posts',
    qs: {
      api_key: config.services.settings.blog.tumblr.api.key,
      id: postId
    }
  };
  var wordpressRequest = {
    url: config.services.settings.blog.wordpress.api.url + '/posts',
    qs: {
    }
  }

  if (config.services.blog.platform === 'tumblr') {
    r.get(tumblrRequest, function (error, response, post) {
      if (error) return next(new Error(error));

      var post;
      var path;
      var f_date;
      var alt_title;
      var posts = post.response.posts;

      if (posts.length > 0) {
        post = posts[0];
        f_date = datetime.strptime(post.date, '%Y-%m-%d %H:%M:%S %Z'); // TODO
        post.formated_date = f_date.strftime('%B %d, %Y'); // TODO
      }

      // At this point we should have a post dict from either Tumblr // TODO or Wordpress
      post.disqus_enabled = config.services.disqus.enabled;
      if (config.services.sharethis.publisher.key) post.sharethis_enabled = true;

      // TODO
      path = '/static/templates/blog-post-' + post.type + '.html';
      context.post_data = template(post)

      if (post.type === 'photo' || post.type === 'video') {
        alt_title = post.type.toUpperCase() + ': ' + post.caption.substring(3, post.caption.length - 4);
      }
      else if (post.type === 'quote') {
        alt_title = post.type.toUpperCase() + ': ' + post.text;
      }
      else if (post.type == 'audio') {
        alt_title = post.type.toUpperCase() + ': ' + post.artist + ' - ' + post.track_name;
      }

      context.post_title = post.get('title', unescape(alt_title));

      if (post.type === 'text' && post.body) {
        context.meta_description = strip_tags(post.body).substring(0,150);
      }

      if (post.tags.length > 0) {
        context.meta_keywords = post.tags.join();
      }

      response.render('blog-post.html', context);
    });
  }

  // TODO
  // elif settings.BLOG_PLATFORM == 'wordpress':
  //   r = requests.get('{0}/posts/{1}'.format(
  //     settings.WORDPRESS_API_URL, post_id))
  //   if r.status_code == 200:
  //     # Get Wordpress response into the same format as Tumblr so we can
  //     # reuse Handlebars template
  //     post = r.json
  //     convertWordpressResponse(post)

});

app.get('/tags/:tag', function (request, response, next) {
  var tag = request.params.tag;
  var offset = request.params.o || 0;
  var tumblrRequest = {
    url: config.services.settings.blog.tumblr.api.url + '/posts',
    qs: {
      api_key: config.services.settings.blog.tumblr.api.key,
      tag: tag,
      offset: offset
    }
  };
  var wordpressRequest = {
    url: config.services.settings.blog.wordpress.api.url + '/posts',
    qs: {
      tag: tag,
      offset: offset
    }
  }

  // If not AJAX request, render and bail.
  if (!request.is_ajax()) return response.render('index.html', { tag_slug: tag}); // TODO

  // If AJAX request, pipe the response from the service to the
  // response for this request.
  if (config.services.blog.platform === 'tumblr') {
    r.get(tubmlrRequest).pipe(response);
  }
  else if (config.services.blog.platform === 'wordpress') {
    r.get(wordpressRequest).pipe(response); // TODO convertWordpressResponse
  }
});

app.get('/blog.json', function (request, response, next) {
  var offset = request.params.o || 0;
  var tumblrRequest = {
    url: config.services.settings.blog.tumblr.api.url + '/posts',
    qs: {
      api_key: config.services.settings.blog.tumblr.api.key,
      offset: offset
    }
  };
  r.get(tumblrRequest).pipe(response);
});
