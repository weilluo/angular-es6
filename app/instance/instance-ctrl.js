export default [
  '$scope',
  '$stateParams',
  ($scope, $stateParams) => {
    $scope.hostname = $stateParams.hostname;
  }
];
