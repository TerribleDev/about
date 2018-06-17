var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
   concatCss = require('gulp-concat-css'),
   uglify = require('gulp-uglify'),
   cachebust = require('gulp-cache-bust'),
   minifyCss = require('gulp-minify-css'),
   minify = require('html-minifier').minify,
   fs = require("fs"),
   concat = require('gulp-concat'),
   rimraf = require('gulp-rimraf');




gulp.task('watch', ['default'], function() {
  gulp.watch(['./css/*.css', '!./css/bundle.css'], ['combineCss']);
  gulp.watch(['./js/*.js', '!./js/bowr.js'], ['combineJs']);
});

gulp.task('clean', function(){
  return gulp.src(['js/bowr.js', 'css/bundle.css', 'components/moment', 'components/jquery'], { read: false }) // much faster
   .pipe(rimraf());
});


gulp.task('combineCss', ['clean'], function(){
  return gulp.src('./css/*.css')
  .pipe(concatCss("bundle.css"))
  .pipe(gulp.dest('css'));

});

gulp.task('minifyHtml',['clean'],function(){
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

gulp.task('minfiyCss',['clean'], function(){
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

gulp.task('minifyJs',['clean'], function() {
  return gulp.src(['components/**/*.min.js','js/*.js'])
    .pipe(uglify({mangle:false}))
    .pipe(concat('bowr.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('combineJs',['clean'], function() {
  return gulp.src(['components/**/*.min.js','js/*.js'])
    .pipe(concat('bowr.js'))
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
//  'develop',
  'combineJs',
  'combineCss'
  //,'watch'
]);
