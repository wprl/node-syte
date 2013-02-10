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
        src: ['static/js/libs/*', 'static/js/components/*'],
        dest: 'static/js/min/scripts-' + config.compress.revision + '.min.js'
      }
    }
  });

  grunt.registerTask('default', 'less min');
};
