module.exports = function(config) {
  var dependencies = [
    'bower_components/angular/angular.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    // use for karma test
    'bower_components/angular-mocks/angular-mocks.js'
  ];

  config.set({
    preprocessors: {
      'app/**/*.html': ['ng-html2js'],
      'app/**/*.js': ['browserify'],
      'tests/units/**/*-spec.js': ['browserify']
    },

    browserify: {
      transform: [
        [
          "babelify",
          {
            "presets": ["es2015", "stage-3"],
            "plugins": [
              [
                "transform-runtime",
                {
                  "polyfill": false,
                  "regenerator": true
                }
              ]
            ]
          }
        ]
      ]
    },

    ngHtml2JsPreprocessor: {
      moduleName: 'templates-main'
    },

    files: dependencies.concat([
      'app/**/*.html',
      'app/**/*.js',
      'tests/units/**/*-spec.js'
    ]),

    exclude: [],

    frameworks: ['mocha', 'browserify', 'chai', 'sinon'],
    reporters: ['mocha', 'dots'],

    browsers: ['PhantomJS'],
    singleRun: true
  });
};
