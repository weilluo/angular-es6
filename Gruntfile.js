var randomstring = require("randomstring");

module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        options: {
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
          "tmp/assets/app.js": ["app/main.js"]
        }
      }
    },

    clean: {
      tmp: ["tmp"],
      dist: ["dist"]
    },

    concat: {
      js: {
        src: [
          "bower_components/angular/angular.js",
          "bower_components/angular-ui-router/release/angular-ui-router.js"
        ],
        dest: "tmp/assets/vendor.js"
      }
    },

    ejs: {
      all: {
        options: {
          version: "<%= version %>"
        },
        src: ["app/index.ejs"],
        dest: "tmp/index.html"
      }
    },

    html2js: {
      options: {
        base: 'app'
        // custom options, see below
      },
      main: {
        src: ["app/**/*.html"],
        dest: "tmp/assets/templates.js"
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: false,
      },
      dist: {
        files: {
          "tmp/assets/app.js": ["tmp/assets/app.js"]
        },
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
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ejs");
  grunt.loadNpmTasks("grunt-html2js");
  grunt.loadNpmTasks('grunt-ng-annotate');

  grunt.registerTask("gv", "Generate a assets version.", function(env) {
    if (env === "dev") {
      grunt.config.set("version", "");
    } else if (env === "prod") {
      grunt.config.set("version", "-" + randomstring.generate());
    } else {
      throw Error("Unkown params env = " + env + " for generate version task.");
    }
  });

  grunt.task.registerTask("build", "Build assets for app.", function(env) {
    if (env === "dev") {
      grunt.task.run("clean:tmp", "gv:dev", "ejs", "html2js", "browserify", "concat");
    } else if (env === "prod") {
      grunt.task.run("clean", "gv:prod", "ejs", "copy_prod", "concat", "less", "uglify", "cssmin", "requirejs");
    } else {
      throw Error("Unkown params env = " + env + " for build assets task.");
    }
  });

  grunt.registerTask("server", ["build:dev", "connect:server", "watch"]);
};
