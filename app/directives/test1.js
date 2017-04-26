import app from '/app';

app.directive('test1', () => {
  return {
    restrict: 'E',
    scope: {
      name: '@'
    },
    link: function () {
    },
    templateUrl: 'directives/test1.html'
  };
});
