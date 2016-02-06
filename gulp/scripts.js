const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const src = global.paths.src + '/scripts/**/*.js';
const dest = global.paths.dest;

const builder = () => {
  return gulp.src(src, {base: global.paths.src})
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
}

const prodBuilder = () => {
  return gulp.src(src, {base: global.paths.src})
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(dest))
}

gulp.task('build:scripts', ['clean'], builder);
gulp.task('build:scripts:watch', builder);
gulp.task('build:scripts:prod', ['clean'], prodBuilder);

gulp.task('watch:scripts', () => {
  return gulp.watch(src, ['build:scripts:watch']);
});

module.exports = {
  build: 'build:scripts',
  watch: 'watch:scripts',
  "build:prod": 'build:scripts:prod'
}

