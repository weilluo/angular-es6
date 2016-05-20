'use strict';

const randomstring = require("randomstring");
const getJsFiles = require('./angular-inject').getJsFiles;
const generateDependences = require('./angular-inject').generateDependences;

module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          browserifyOptions: {
            debug: "<%= debug %>"
          },
          transform: [[
            "babelify",
            {
              "presets": ["es2015", "stage-3"],
              "plugins": [[
                "transform-runtime",
                {
                  "polyfill": false,
                  "regenerator": true
                }
              ]]
            }
          ]]
        },
        files: {
          "tmp/assets/app.js": ["app/main-temp.js"]
        }
      }
    },

    clean: {
      tmp: ["tmp"],
      dist: ["dist"],
      mainTemp: ["app/main-temp.js"]
    },

    concat: {
      js: {
        options: {
          separator: ';',
        },
        src: [
          "bower_components/angular/angular.js",
          "bower_components/angular-ui-router/release/angular-ui-router.js",
          'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
        ],
        dest: "tmp/assets/vendor.js"
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
          version: "<%= version %>"
        },
        src: ["app/index.ejs"],
        dest: "tmp/index.html"
      },
      mainJs: {
        options: {
          dependences: "<%= dependences %>"
        },
        src: ['app/main.ejs'],
        dest: 'app/main-temp.js'
      }
    },

    html2js: {
      options: {
        base: "app"
      },
      main: {
        src: ["app/**/*.html"],
        dest: "tmp/assets/templates.js"
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
        spawn: true,
        livereload: true
      },
      src: {
        files: ["app/index.ejs", "app/**/*.js", "app/**/*.html", "app/**/*.less"],
        tasks: ["build:dev"]
      }
    },

    connect: {
      server: {
        options: {
          livereload: true,
          port: 4200,
          base: "tmp"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ejs");
  grunt.loadNpmTasks("grunt-html2js");

  grunt.registerTask('injector', 'Angular auto inject.', function() {
    var files = getJsFiles('app');
    grunt.config.set('dependences', generateDependences(files));
  });

  grunt.task.registerTask("build", "Build assets for app.", function(env) {
    if (env === "dev") {
      grunt.config.set("version", "");
      grunt.config.set("debug", true);
      grunt.task.run("clean", "injector", "ejs", `copy:${env}`, "html2js", "browserify", "concat", "less");
    } else if (env === "prod") {
      grunt.config.set("debug", false);
      grunt.config.set("version", `-${randomstring.generate()}`);
      grunt.task.run("clean", "injector", "ejs", `copy:${env}`, "html2js", "browserify", "concat", "less", "uglify", "cssmin");
    } else {
      throw Error(`Unkown params env = ${env} for build assets task.`);
    }
  });

  grunt.registerTask("test11", function() {
    var files = getJsFiles('app');
    console.log(files);
  });

  grunt.registerTask("server", ["build:dev", "connect:server", "watch"]);
};
