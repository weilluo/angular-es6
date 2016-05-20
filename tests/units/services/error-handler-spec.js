describe('JavaScript error handler', () => {
  beforeEach(angular.mock.module('errorHandler', ($exceptionHandlerProvider) => {
    $exceptionHandlerProvider.mode('log');
  }));

  let errors, host = 'http://localhost:3000';

  beforeEach(angular.mock.inject(($rootScope) => {
    let scope = $rootScope.$new();
    errors = [];
    scope.$on('error', (e, message) => { errors.push(message); });
  }));

  afterEach(angular.mock.inject(($httpBackend) => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));

  it('should broadcast script errors and log them to the server',
      angular.mock.inject(($exceptionHandler, $httpBackend, $window, LOGGING_URL, SCRIPT_ERROR_MSG) => {
    $httpBackend.expectPOST(host + LOGGING_URL,
      {type: 'ClientError', params: {subject: 'Fulfillment Tool Tank Client Error', message: 'oh error', stack: 'oh error', url: $window.location.href}},
      {'content-type': 'application/json'}, undefined, true).respond(200);
    $exceptionHandler('oh error');
    $httpBackend.flush();
    expect(errors.length).to.eql(1);
    expect(errors[0]).to.eql(SCRIPT_ERROR_MSG);
  }));

  it('should broadcast script errors even when server call fails',
      angular.mock.inject(($exceptionHandler, $httpBackend, LOGGING_URL, SCRIPT_ERROR_MSG) => {
    $httpBackend.whenPOST(host + LOGGING_URL).respond(500);
    $exceptionHandler('oh error');
    $httpBackend.flush();
    expect(errors.length).to.eql(1);
    expect(errors[0]).to.eql(SCRIPT_ERROR_MSG);
  }));
});
