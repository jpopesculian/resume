const gulp = require('gulp');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');

const src = [
  global.paths.src + '/assets/**/*'
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
    .pipe(gulp.dest(dest))
}

gulp.task('build:assets', ['clean'], builder);
gulp.task('build:assets:watch',  builder);
gulp.task('build:assets:prod', ['clean'], prodBuilder);

gulp.task('watch:assets', () => {
  return gulp.watch(src, ['build:assets:watch']);
});

module.exports = {
  build: 'build:assets',
  // watch: 'watch:assets',
  "build:prod": 'build:assets:prod'
}

