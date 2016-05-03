describe('demoService test example', () => {
  let $service;

  beforeEach(angular.mock.module('DemoAppTest'));

  beforeEach(angular.mock.inject((_demoService_) => {
      $service = _demoService_;
  }));

  it('run a test method', () => {
    let r = $service.exmapleMethod();
    expect(r).to.equal('karma test method');
  });
});
