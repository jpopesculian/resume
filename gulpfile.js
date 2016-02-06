'use strict';

const gulp = require('gulp');
const gulpDir = require('gulp-dir');

global.paths = {
  src: 'src',
  dest: 'dist'
}

gulpDir(__dirname + '/gulp');

gulp.task('default', ['clean', 'build', 'watch', 'sync']);
gulp.task('prod', ['clean', 'build:prod']);
