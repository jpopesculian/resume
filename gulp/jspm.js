const gulp = require('gulp');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');

const src = [
  global.paths.src + '/jspm_packages/**/*',
  global.paths.src + '/config.js'
]
const dest = global.paths.dest;

const builder = () => {
  return gulp.src(src, {base: global.paths.src})
    .pipe(plumber())
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
}

gulp.task('build:jspm', ['clean'], builder);
gulp.task('build:jspm:watch',  builder);

gulp.task('watch:jspm', () => {
  return gulp.watch(src, ['build:jspm:watch']);
});

module.exports = {
  build: 'build:jspm',
  // watch: 'watch:jspm'
}

