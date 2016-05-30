import app from './app';

document.addEventListener('DOMContentLoaded', (event) => {
  window.deferredBootstrapper.bootstrap({
    element: document.body,
    module: app.name,
    injectorModules: app.name,
    resolve: {
    },
    onError: (error) => {
      // window.location.href = '/login';
    }
  });
});
