module.exports = function () {
  // because the default timeout value is 5 * 1000 ms,
  // but load the static files sometimes will cost more than 5000 ms.
  this.setDefaultTimeout(20 * 1000);

  this.Given(/^I visit the home page$/, function(callback) {
    // https://github.com/angular/protractor/issues/1760#issuecomment-157472740
    // browser.driver.get(browser.baseUrl).then(callback);
    browser.get(browser.baseUrl).then(callback);
  });
};
