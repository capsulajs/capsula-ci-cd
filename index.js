'use strict';

const isValid = require('is-valid-app');
const shell = require('shelljs');

module.exports = function(app) {
  if (!isValid(app, 'capsula-ci-cd')) return;
  
  app.task('travis', { silent: true }, function() {
    return app.src('.travis.yml', {cwd: __dirname})
      .pipe(app.dest(function() {
        return app.cwd;
      }));
  });
  
  app.task('deploy', function () {
    shell.exec('./build/deploy')
  });
  
  app.task('release', function () {
    shell.exec('./build/release')
  });
  
  app.task('default', ['travis']);
};
