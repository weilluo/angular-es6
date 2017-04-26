exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['tests/features/**/*.feature'],
  exclude: [],
  mocks: {
    default: [],
    dir: 'tests/mock_data'
  },
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: 'tests/features/**/step_definitions/*.js',
    format: 'pretty'
  },
  capabilities: {
    browserName: 'chrome'
  },
  baseUrl: 'http://localhost:4200',
  resultJsonOutputFile: 'tests/features/report.json',

  onPrepare: function() {
    var chai = require('chai');
    chai.use(require('chai-as-promised'));

    global.expect = chai.expect;

    global.wait_until_modal_open = function(element) {
      return browser.wait(function () {
        return element.isPresent().then(function(present) {
          return present;
        });
      }, 1500);
    };

    global.wait_until_modal_close = function(element) {
      return browser.wait(function () {
        return element.isPresent().then(function(present) {
          return !present;
        });
      }, 1500);
    };

    global.wait_until_element_present = function(element) {
      return browser.wait(function () {
        return element.isPresent().then(function(present) {
          return present;
        });
      }, 3000);
    };

    var browserName, platform,
      window = browser.manage().window();

    // set the window size
    browser.getCapabilities()
      .then(function() {  // getCurrentWindowSize
        return window.getSize();
      })
      .then(function(dimensions) {  // setWindowSize
        return window.setSize(1280, 1024);
      })
      .then(function() {  // getUpdatedWindowSize
        return window.getSize();
      })
      .then(function(dimensions) {  // showWindowSize
        console.log('Running e2e tests...');
      });
  }
};
