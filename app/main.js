import app from './app';

import routeConfig from './route';

import ApplicationCtrl from './homepage/application-ctrl';
import IndexCtrl from './homepage/index-ctrl';
import InstancesCtrl from './instance/instances-ctrl';
import InstanceCtrl from './instance/instance-ctrl';

app.config(routeConfig);

app.controller('ApplicationCtrl', ApplicationCtrl);
app.controller('IndexCtrl', IndexCtrl);
app.controller('InstancesCtrl', InstancesCtrl);
app.controller('InstanceCtrl', InstanceCtrl);

angular.bootstrap(document, [app.name]);
