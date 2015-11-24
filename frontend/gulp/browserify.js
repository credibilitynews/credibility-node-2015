import sequence from 'run-sequence';
import color from 'cli-color';

import browserify from 'browserify';
import source from 'vinyl-source-stream';
import babelify from 'babelify';
import watchify from 'watchify';

module.exports = function(gulp, opts, $){
    var config = opts.config;

    function build(watch, watchCallback){
        var b = browserify({
            debug: true,
            cache: {},
            packageCache: {},
            fullPaths: true,
            paths: [config.jsDir],
            extensions: ['js']
        });
        b.transform(babelify);
        b = watch ? watchify(b) : b;
        b.add(config.jsDir+'/index.js');

        function rebundle(){
            return b.bundle()
                    .pipe(source('bundle.js'))
                    .pipe(gulp.dest(config.distDir+'/js/'));
        }

        b.on('update', function(path){
            $.util.log(color.yellowBright('rebundling...'));
            return rebundle();
        });
        b.on('time', function(time){
            $.util.log("Finished "+color.yellowBright("rebundle()")+" after "+color.magenta(time+" ms"));
            watchCallback();
        });

        return rebundle();
    }

    gulp.task('browserify', function(){
        return build(false);
    });

    gulp.task('watch-browserify', ['browserify'], function() {
        return build(true, function(){
            hightlight('Finished bundling for \'watch-js\'');
        });
    });

    function hightlight(prefix){
        var c = ['bgRed', 'bgGreen', 'bgYellow', 'bgBlue', 'bgMagenta', 'bgCyan', 'bgWhite'];
        var r = Math.floor(Math.random() * 7);
        var e = color.black[c[r]](prefix);
        $.util.log(e);
    }
}
