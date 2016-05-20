'use strict';

const fs = require('fs');
const path = require('path');
const camelCase = require('camelcase');
const upperCamelCase = require('uppercamelcase');

function getJsFiles(_path) {
  let results = [];
  let dirs = fs.readdirSync(path.resolve(__dirname, _path));

  dirs.forEach(dir => {
    if (fs.statSync(path.resolve(__dirname, _path, dir)).isDirectory()) {
      results = results.concat(getJsFiles(`${_path}/${dir}`));
    } else if (fs.statSync(path.resolve(__dirname, _path, dir)).isFile() && dir.endsWith('.js')) {
      results.push(`${_path}/${dir.replace('.js', '')}`);
    }
  });

  return results.filter(p => p !== 'app/main' && p !== 'app/error-handler').map(p => p.replace(/app\//, './'));
}

function generateDependences(files) {
  let appIndex, routeIndex;

  for (var i = 0; i < files.length - 1; i++) {
    if (files[i] === './app') {
      appIndex = i;
    }
    if (files[i] === './route') {
      routeIndex = i;
    }
  }

  let result = '';
  for(let i = 0; i < files.length; i++) {
    result = `${result}import a${i} from '${files[i]}';`;
  }

  // app, routeConig
  result = `${result}a${appIndex}.config(a${routeIndex});`;

  let filename, parentDirName;

  // controller, directive, services, models
  for(let i = 0; i < files.length; i++) {
    filename = files[i].split("\/").pop();

    parentDirName = files[i].split("\/");
    parentDirName.pop();
    parentDirName = parentDirName.pop();

    if (parentDirName.match(/models/) || filename.endsWith('-model')) {
      result = `${result}a${appIndex}.factory('${upperCamelCase(filename)}', a${i});`;
    } else if (parentDirName.match(/services/) || filename.endsWith('-service')) {
      result = `${result}a${appIndex}.factory('${camelCase(filename)}', a${i});`;
    } else if (parentDirName.match(/directives/) || files[i].endsWith('-directive')) {
      result = `${result}a${appIndex}.directive('${camelCase(filename.replace('-directive', ''))}', a${i});`;
    } else if (files[i].endsWith('-ctrl')) {
      result = `${result}a${appIndex}.controller('${upperCamelCase(filename)}', a${i});`;
    }
  }

  return result + `angular.bootstrap(document, [a${appIndex}.name]);`;
}

module.exports = {
  getJsFiles: getJsFiles,
  generateDependences: generateDependences
}
