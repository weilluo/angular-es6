module.exports = function () {
  this.Given(/^I visit the home page$/, function(callback) {
    // https://github.com/angular/protractor/issues/1760#issuecomment-157472740
    // browser.driver.get(browser.baseUrl).then(callback);
    browser.get(browser.baseUrl).then(callback);
  });
};
