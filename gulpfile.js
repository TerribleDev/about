var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
   concatCss = require('gulp-concat-css'),
   uglify = require('gulp-uglify'),
   cachebust = require('gulp-cache-bust'),
   minifyCss = require('gulp-minify-css');




gulp.task('watch', function() {
  gulp.watch('./public/css/*.less', ['less']);
  gulp.watch('./public/css/*.css', ['combineCss']);
});


gulp.task('combineCss', function(){
  return gulp.src('./public/css/*.css')
  .pipe(concatCss("bundle.css"))
  .pipe(gulp.dest('public/css'));

});

gulp.task('minfiyCss', function(){
  return gulp.src('public/css/*.css')
   .pipe(minifyCss({compatibility: 'ie8'}))
   .pipe(gulp.dest('public/css'));
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

gulp.task('minifyJs', function() {
  return gulp.src('public/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});


gulp.task('cachebust', function(){
  return gulp.src('app/views/index.vash')
      .pipe(cachebust({
          type: 'timestamp'
      }))
      .pipe(gulp.dest('./app/views'));

});

gulp.task('publish', [
  'combineCss',
  'minifyJs',
  'cachebust'
]);

gulp.task('default', [
  'develop',
  'combineCss',
  'watch'
]);
