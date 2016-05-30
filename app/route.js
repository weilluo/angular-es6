import app from './app';

app.config(($stateProvider, $urlRouterProvider) => {
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise('/');
  $urlRouterProvider.when('', '/');

  $stateProvider
    .state('application', {
      url: '',
      templateUrl: 'homepage/application.html',
      controller: 'ApplicationCtrl'
    })
    .state('index', {
      url: '/',
      parent: 'application',
      templateUrl: 'homepage/index.html',
      controller: 'IndexCtrl'
    })
    .state('instances', {
      url: '/instances',
      parent: 'application',
      templateUrl: 'instance/instances.html',
      controller: 'InstancesCtrl'
    })
    .state('instance', {
      url: '/:hostname',
      parent: 'instances',
      templateUrl: 'instance/instance.html',
      controller: 'InstanceCtrl'
    });
});
