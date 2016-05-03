module.exports = function(config) {
  var dependencies = [
    'bower_components/angular/angular.js',
    'bower_components/angular-mocks/angular-mocks.js'
  ];

  config.set({
    preprocessors: {
      'tests/units/test-main.js': ['browserify'],
      'tests/units/**/*-spec.js': ['browserify']
    },

    browserify: {
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

    files: dependencies.concat([
      'tests/units/**/*-spec.js',
      'tests/units/test-main.js'
    ]),

    exclude: [],

    frameworks: ['mocha', 'browserify', 'chai', 'sinon'],
    reporters: ['mocha', 'dots'],

    browsers: ['PhantomJS'],
    singleRun: true
  });
};
