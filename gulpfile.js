var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var reactify = require('reactify');
var less = require('gulp-less');

gulp.task('browserify', function(){
  var b = browserify({debug: true});
  b.transform(reactify); // use the reactify transform
  b.add('./src/js/main.js');
  return b.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('less', function(){
    return gulp.src('src/less/main.less')
            .pipe(less())
            .pipe(concat('main.css'))
            .pipe(gulp.dest('dist/css'));
});

gulp.task('copy', function() {
    gulp.src('src/index.html')
      .pipe(gulp.dest('dist'));
});

gulp.task('default',['browserify', 'copy']);

gulp.task('watch', function() {
    gulp.watch(['src/**/*.js', 'src/**/*.html'], ['browserify']);
});

gulp.task('watch-css', function() {
    gulp.watch('src/**/*.less', ['less']);
});
