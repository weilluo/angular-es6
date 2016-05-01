import app from '../app';

app.controller('InstanceCtrl', ($scope, $stateParams) => {
  $scope.hostname = $stateParams.hostname;
});
