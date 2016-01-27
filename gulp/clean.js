const gulp = require('gulp');
const del = require('del');

const target = global.paths.dest

gulp.task('clean:dest', () => {
  return del.sync(target);
});

module.exports = {
  clean: 'clean:dest'
}
