const gulp = require('gulp');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');

const src = global.paths.src + '/loader.js'
const dest = global.paths.dest;

const builder = () => {
  return gulp.src(src, {base: global.paths.src})
    .pipe(plumber())
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
}

const prodBuilder = () => {
  return gulp.src(src, {base: global.paths.src})
    .pipe(uglify())
    .pipe(gulp.dest(dest))
}

gulp.task('build:loader', ['clean'], builder);
gulp.task('build:loader:watch',  builder);
gulp.task('build:loader:prod', ['clean'], prodBuilder);

gulp.task('watch:loader', () => {
  return gulp.watch(src, ['build:loader:watch']);
});

module.exports = {
  build: 'build:loader',
  watch: 'watch:loader',
  "build:prod": 'build:loader:prod'
}

