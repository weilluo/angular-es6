import app from '../app';

app.factory('demoService', () => {
  return {
    exmapleMethod() {
      return "karma test method";
    }
  };
});
