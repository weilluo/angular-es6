import app from '/app';

app.controller('InstancesCtrl', ($scope) => {
  $scope.model = [
    {id: 1, hostname: 'xxxx.1111.com'},
    {id: 2, hostname: 'xxxx.2222.com'}
  ];
});
