import app from '../app';

app.directive('test1', () => {
  return {
    restrict: 'E',
    scope: {
      name: '@'
    },
    link: function (scope, element, attrs) {
    },
    templateUrl: 'directives/test1.html'
  }
});
