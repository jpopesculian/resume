const gulp = require('gulp');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const minify = require('gulp-minify-inline');
const inject = require('gulp-inject-file');

const src = global.paths.src + '/**/*.html';
const dest = global.paths.dest;

const builder = () => {
  return gulp.src(src, {base: global.paths.src})
    .pipe(plumber())
    .pipe(inject())
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
}

const prodBuilder = () => {
  return gulp.src(src, {base: global.paths.src})
    .pipe(inject())
    .pipe(minify())
    .pipe(gulp.dest(dest))
}

gulp.task('build:html', ['clean'], builder);
gulp.task('build:html:watch', builder);
gulp.task('build:html:prod', ['clean'], prodBuilder);

gulp.task('watch:html', () => {
  return gulp.watch(src, ['build:html:watch']);
});

module.exports = {
  build: 'build:html',
  watch: 'watch:html',
  "build:prod": 'build:html:prod'
}
