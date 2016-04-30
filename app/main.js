import app from './app';
import route from './route';

import ApplicationCtrl from './homepage/application-ctrl';
import IndexCtrl from './homepage/index-ctrl';
import InstancesCtrl from './instance/instances-ctrl';
import InstanceCtrl from './instance/instance-ctrl';

app.config(route);

app.controller('ApplicationCtrl', ApplicationCtrl);
app.controller('IndexCtrl', IndexCtrl);
app.controller('InstancesCtrl', InstancesCtrl);
app.controller('InstanceCtrl', InstanceCtrl);

angular.bootstrap(document, [app.name]);
