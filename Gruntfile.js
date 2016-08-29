'use strict';

const randomstring = require('randomstring');

module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      options: {
        transform: [[
          'babelify',
          {
            'presets': ['es2015', 'stage-3'],
            'plugins': [[
              'transform-runtime',
              {
                'polyfill': false,
                'regenerator': true
              }
            ]]
          }
        ]]
      },
      dev: {
        options: {
          browserifyOptions: {
            debug: true
          },
          watch: true,
          ignore: [
            // path.resolve(__dirname, 'app/app.js')
          ]
        },
        files: {
          'tmp/assets/app.js': [ 'app/**/*.js' ]
        }
      },
      prod: {
        files: {
          'tmp/assets/app.js': [ 'app/**/*.js' ]
        }
      }
    },

    ngAnnotate: {
      app: {
        files: {
          'tmp/assets/app.js': ['tmp/assets/app.js'],
        }
      },
    },

    clean: {
      tmp: ['tmp'],
      dist: ['dist'],
      index: ['tmp/index.html'],
      js: ['tmp/assets/app.js'],
      less: ['tmp/assets/app.css'],
      template: ['tmp/assets/templates.js']
    },

    concat: {
      js: {
        options: {
          separator: ';',
        },
        src: [
          'bower_components/angular/angular.js',
          'bower_components/angular-ui-router/release/angular-ui-router.js',
          'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
        ],
        dest: 'tmp/assets/vendor.js'
      },
      css: {
        src: [
          'bower_components/bootstrap/dist/css/bootstrap.css'
        ],
        dest: 'tmp/assets/vendor.css'
      }
    },

    copy: {
      dev: {
        files: [
          {expand: true, flatten: true, src: ['bower_components/bootstrap/dist/fonts/**'], dest: 'tmp/assets/fonts', filter: 'isFile'}
        ]
      },

      prod: {
        files: [
          {src: ['tmp/index.html'], dest: 'dist/index.html'},
          {expand: true, flatten: true, src: ['bower_components/bootstrap/dist/fonts/**'], dest: 'dist/assets/fonts', filter: 'isFile'}
        ]
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      build: {
        files: {
          'dist/assets/vendor<%= version %>.css': ['tmp/assets/vendor.css'],
          'dist/assets/app<%= version %>.css': ['tmp/assets/app.css']
        }
      }
    },

    ejs: {
      indexHtml: {
        options: {
          version: '<%= version %>'
        },
        src: ['app/index.ejs'],
        dest: 'tmp/index.html'
      }
    },

    html2js: {
      options: {
        base: 'app'
      },
      main: {
        src: ['app/**/*.html'],
        dest: 'tmp/assets/templates.js'
      }
    },

    less: {
      dist: {
        files: {
          'tmp/assets/app.css': 'app/styles/app.less'
        }
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      build: {
        files: {
          'dist/assets/vendor<%= version %>.js': ['tmp/assets/vendor.js'],
          'dist/assets/templates<%= version %>.js': ['tmp/assets/templates.js'],
          'dist/assets/app<%= version %>.js': ['tmp/assets/app.js']
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      index: {
        files: ['app/index.ejs'],
        tasks: ['clean:index', 'ejs', `copy:dev`]
      },
      js: {
        files: ['tmp/assets/app.js', 'public/js/**/*.js'],
        tasks: ['jshint'],
        options: {
          spawn: false
        }
      },
      less: {
        files: ['app/**/*.less'],
        tasks: ['clean:less', 'less'],
        options: {
          spawn: false
        }
      },
      template: {
        files: ['app/**/*.html'],
        tasks: ['clean:template', 'html2js'],
        options: {
          spawn: false
        }
      }
    },

    connect: {
      server: {
        options: {
          livereload: true,
          port: 4200,
          base: 'tmp'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      },
      app: ['app/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ejs');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-ng-annotate');

  grunt.registerTask('build', 'Build assets for app.', (env) => {
    if (env === 'dev') {
      grunt.config.set('version', '');
      grunt.task.run('clean', 'ejs', `copy:dev`, 'html2js', 'browserify:dev', 'less', 'concat');
    } else if (env === 'prod') {
      grunt.config.set('version', `-${randomstring.generate()}`);
      grunt.task.run('clean', 'ejs', `copy:prod`, 'html2js', 'browserify:prod', 'less', 'ngAnnotate', 'concat', 'uglify', 'cssmin');
    } else {
      throw Error(`Unkown params env = ${env} for build assets task.`);
    }
  });

  grunt.registerTask('server', ['build:dev', 'connect:server', 'watch']);
};
