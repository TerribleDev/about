var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  less = require('gulp-less'),
   concatCss = require('gulp-concat-css');

gulp.task('less', function () {
  gulp.src('./public/css/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('combineCss', function(){
  gulp.src('./public/**/*.css')
  .pipe(concatCss("bundle.css"))
  .pipe(gulp.dest('public/out'));

});

gulp.task('watch', function() {
  gulp.watch('./public/css/*.less', ['less']);
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee handlebars vash',
  }).on('restart', function () {
    setTimeout(function () {
      livereload.changed(__dirname);
    }, 500);
  });
});

gulp.task('publish', [
  'less'
]);

gulp.task('default', [
  'less',
  'develop',
  'watch'
]);
