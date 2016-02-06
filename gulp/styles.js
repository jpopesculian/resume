const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const cssnano = require('gulp-cssnano');

const src = global.paths.src + '/styles/**/*.scss';
const dest = global.paths.dest;

const builder = () => {
  return gulp.src(src, {base: global.paths.src})
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
}

const prodBuilder = () => {
  return gulp.src(src, {base: global.paths.src})
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest(dest))
}

gulp.task('build:styles', ['clean'], builder);
gulp.task('build:styles:watch', builder);
gulp.task('build:styles:prod', ['clean'], prodBuilder);

gulp.task('watch:styles', () => {
  return gulp.watch(src, ['build:styles:watch']);
});

module.exports = {
  build: 'build:styles',
  watch: 'watch:styles',
  "build:prod": 'build:styles:prod'
}

