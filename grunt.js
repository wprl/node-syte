module.exports = function(grunt) {
  var config = require('config');

  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.initConfig({
    less: {
      default: {
        options: {
          yuicompress: true
        },
        src: ['static/less/styles.less'],
        dest: 'static/css/styles-' + config.compress.revision + '.min.css'
      }
    },
    min: {
      js: {
        // need to include requirejs first
        src: ['static/js/libs/require.js', 'static/js/libs/jquery.url.js',
              'static/js/libs/bootstrap-modal.js', 'static/js/libs/prettify.js',
              'static/js/libs/text.js', 'static/js/libs/bootstrap-transition.js',
              'static/js/libs/json.js', 'static/js/libs/handlebars.js',
              'static/js/libs/moment.min.js', 'static/js/libs/spin.js',
              'static/js/components/*'],
        dest: 'static/js/min/scripts-' + config.compress.revision + '.min.js'
      }
    }
  });

  grunt.registerTask('default', 'less min');
};
