const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');

const src = global.paths.src + '/styles/**/*.scss';
const dest = global.paths.dest;

const builder = () => {
  return gulp.src(src, {base: global.paths.src})
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
}

gulp.task('build:styles', ['clean'], builder);
gulp.task('build:styles:watch', builder);

gulp.task('watch:styles', () => {
  return gulp.watch(src, ['build:styles:watch']);
});

module.exports = {
  build: 'build:styles',
  watch: 'watch:styles'
}

