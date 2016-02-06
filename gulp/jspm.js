const gulp = require('gulp');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');

const src = [
  global.paths.src + '/jspm_packages/**/*.js',
  global.paths.src + '/config.js'
]
const dest = global.paths.dest;

const builder = () => {
  return gulp.src(src, {base: global.paths.src})
    .pipe(plumber())
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
}

const prodBuilder = () => {
  return gulp.src(src, {base: global.paths.src})
    // .pipe(uglify())
    .pipe(gulp.dest(dest))
}

gulp.task('build:jspm', ['clean'], builder);
gulp.task('build:jspm:watch',  builder);
gulp.task('build:jspm:prod', ['clean'], prodBuilder);

gulp.task('watch:jspm', () => {
  return gulp.watch(src, ['build:jspm:watch']);
});

module.exports = {
  build: 'build:jspm',
  // watch: 'watch:jspm',
  "build:prod": 'build:jspm:prod'
}

