const gulp = require('gulp');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');

const src = global.paths.src + '/**/*.html';
const dest = global.paths.dest;

const builder = () => {
  return gulp.src(src, {base: global.paths.src})
    .pipe(plumber())
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
}

gulp.task('build:html', ['clean'], builder);
gulp.task('build:html:watch', builder);

gulp.task('watch:html', () => {
  return gulp.watch(src, ['build:html:watch']);
});

module.exports = {
  build: 'build:html',
  watch: 'watch:html'
}
