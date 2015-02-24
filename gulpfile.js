var gulp = require('gulp');

var clean = require('gulp-clean');
var rimraf = require('gulp-rimraf');
var connect = require('gulp-connect');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');

var dev = {
  dir: 'demo',
  index: 'demo/index.html',
  views: ['demo/view.html', 'demo/layouts.html'],
  fonts: 'bower_components/bootstrap/fonts/*'
};

var prod = {
  dir: 'demo_dist',
  fonts: 'demo_dist/fonts'
};

var options = {
  clean: { read: false },
  uglify: { mangle: false }
};

gulp.task('watch', function() {
   gulp.watch('styles/*.less', ['less']);
})

gulp.task('clean', function() {
  return gulp.src(prod.dir, options.clean)
    .pipe(rimraf({ force: true }));
});

gulp.task('copy', function() {
  gulp.src(dev.fonts)
    .pipe(gulp.dest(prod.fonts));

  gulp.src(dev.views)
    .pipe(gulp.dest(prod.dir));
});

gulp.task('demo_dist', ['clean', 'copy'], function() {
  gulp.src(dev.index)
    .pipe(usemin({
      css: [minifyCss()],
      js: [uglify(options.uglify)]
    }))
    .pipe(gulp.dest(prod.dir));
});

gulp.task('serve', function() {
   connect.server({
      livereload: true
   });
});

gulp.task('default', ['serve', 'watch']);