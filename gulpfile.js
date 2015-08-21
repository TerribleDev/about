var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
   concatCss = require('gulp-concat-css'),
   uglify = require('gulp-uglify'),
   cachebust = require('gulp-cache-bust'),
   minifyCss = require('gulp-minify-css'),
   minify = require('html-minifier').minify,
   fs = require("fs");




gulp.task('watch', function() {
  gulp.watch('./css/*.less', ['less']);
  gulp.watch('./css/*.css');
});


gulp.task('combineCss', function(){
  return gulp.src('./css/*.css')
  .pipe(concatCss("bundle.css"))
  .pipe(gulp.dest('css'));

});

gulp.task('minifyHtml',function(){
   var fileContent=fs.readFileSync("index.html", "utf8");
   var fileContent2 = minify(fileContent, {
     removeComments: true,
              removeCommentsFromCDATA: false,
              collapseWhitespace: true,
              collapseBooleanAttributes: true,
              removeAttributeQuotes: true,
              removeEmptyAttributes: true
   });
   fs.writeFileSync('index.html', fileContent2, {});
});

gulp.task('minfiyCss', function(){
  return gulp.src('css/*.css')
   .pipe(concatCss("bundle.css"))
   .pipe(minifyCss({compatibility: 'ie8'}))
   .pipe(gulp.dest('css'));
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
  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});


gulp.task('cachebust', function(){
  return gulp.src('index.html')
      .pipe(cachebust({
          type: 'timestamp'
      }))
      .pipe(gulp.dest('.'));

});

gulp.task('publish', [
  'minfiyCss',
  'minifyHtml',
  'minifyJs',
  'cachebust'
]);

gulp.task('default', [
  'develop',
  'combineCss',
  'watch'
]);
