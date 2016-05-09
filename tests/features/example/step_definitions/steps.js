module.exports = function() {
  this.When(/^I visit the another page$/, function(callback) {
    browser.get(browser.baseUrl + '/#/instances/xxxx.1111.com').then(callback);
  });

  this.Then(/^I should see the correct page$/, function(callback) {
    expect(browser.getCurrentUrl()).to.eventually.contain('instances/xxxx.1111.com').notify(callback);
  });
};
