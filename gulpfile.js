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
var gutil = require('gulp-util');

function build(watch, watchCallback){
    var b = browserify({
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });

    b.transform(reactify);
    //b.transform(es6ify).configure(/^(?!.*node_modules)+.+\.js$/));

    b = watch ? watchify(b) : b;
    b.add('./src/js/main.js');

    function rebundle(){
        return b.bundle()
            .pipe(source('main.js'))
            .pipe(gulp.dest('dist/js'));
    }

    b.on('update', function(path){
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

gulp.task('watch-js', ['browserify'], function(){
    return build(true);
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
    gulp.watch('src/**/*.less', ['less']);
});
