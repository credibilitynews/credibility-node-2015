var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var es6ify = require('es6ify');
var sourcemaps = require('gulp-sourcemaps');
var watchify = require('watchify');

function bundleShare(b){ 
  return b.bundle()
    .pipe(source('main.js'))
//    .pipe(buffer())
//    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
 
}

gulp.task('browserify', function(){
  var b = browserify({
      debug: true,
      cache: {},
      packageCache: {},
      fullPaths: true
    })
    .add(es6ify.runtime)
    .transform(reactify); // use the reactify transform

    b.add('./src/js/main.js');
    b = watchify(b);
    b.on('update', function(){
        return bundleShare(b);
    });

    return bundleShare(b);
});

gulp.task('less', function(){
    return gulp.src('src/less/main.less')
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(sourcemaps.write())
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
