angular.module('errorHandler', [])
  .constant('SCRIPT_ERROR_MSG', 'An error has occured and the details have been logged. Please contact customer support for assistance.')
  .constant('LOGGING_URL', '/jobs/mail')
  .config(['$provide', ($provide) => {
    $provide.decorator('$exceptionHandler', ['$delegate', '$injector', '$window', 'SCRIPT_ERROR_MSG', 'LOGGING_URL',
      ($delegate, $injector, $window, SCRIPT_ERROR_MSG, LOGGING_URL) => {
        return (exception, cause) => {
          // Using injector to get around cyclic dependencies
          $injector.get('$rootScope').$broadcast('error', SCRIPT_ERROR_MSG);

          // POST URL
          let url = 'http://localhost:3000';
          url = url + LOGGING_URL;

          // By passing angular's http abstraction to avoid infinite exception loops
          let httpBackend = $injector.get('$httpBackend');

          /*
            params: method, url, data, callback, headers, timeout, withCredentials
          */
          httpBackend('POST', url, angular.toJson({
            type: "ClientError",
            params: {
              subject: "Fulfillment Tool Tank Client Error",
              message: exception.message || exception || '',
              stack: exception.stack || exception.message || exception || '',
              url: $window.location.href
            }
          }), angular.noop, {'content-type': 'application/json'}, undefined, true);
          $delegate(exception, cause);
        };
      }
    ]);
  }]);
