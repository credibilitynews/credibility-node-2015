var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var es6ify = require('es6ify');
var sourcemaps = require('gulp-sourcemaps');
var watchify = require('watchify');
var gutil = require('gulp-util');
var bower = require('gulp-bower');

function build(watch, watchCallback){
    var b = browserify({
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });

    b.transform(babelify);

    b = watch ? watchify(b) : b;
    b.add('./src/js/main.js');

    function rebundle(){
        return b.bundle()
            .pipe(source('main.js'))
            .pipe(gulp.dest('../backend/public/js'));
    }

    b.on('update', function(path){
        gutil.log("Starting rebundle() on changes: "+path);
        return rebundle();
    });
    b.on('time', function(time){
        gutil.log("Finished rebundle() after "+time+" ms");
        if(watchCallback) watchCallback();
    });
    return rebundle();
}

gulp.task('browserify', function(){
    return build(false);
});

gulp.task('watch', ['browserify'], function(){
    return build(true);
});

gulp.task('less', function(){
    return gulp.src('src/less/main.less')
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(sourcemaps.write())
            .pipe(concat('main.css'))
            .pipe(gulp.dest('../backend/public/css'));
});

gulp.task('watch-less', function() {
    gulp.watch('src/**/*.less', ['less']);
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('../backend/public/bower_components'))
});

gulp.task('default',['browserify', 'less', 'bower']);
