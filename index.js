'use strict';

var path = require('path');
var isValid = require('is-valid-app');

module.exports = function(app) {
  if (!isValid(app, 'capsula-ci-cd')) return;
  
  app.task('travis', { silent: true }, function(cb) {
    return app.src('.travis.yml', {cwd: __dirname})
      .pipe(app.dest(function() {
        return app.cwd;
      }));
  });
  
  app.task('default', ['travis']);
};
