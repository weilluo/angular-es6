import demoService from '../../app/services/demo-service';

let app = angular.module('DemoAppTest', []);

app.service('demoService', demoService);

angular.bootstrap(document, [app.name]);
