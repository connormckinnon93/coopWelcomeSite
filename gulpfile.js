var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var path = require('path');
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
var sourcemaps = require('gulp-sourcemaps');

gulp.task('serve', function() {
    browserSync.init({
      server: {
          baseDir: "./src/"
      } 
    });
    
    gulp.watch("./src/**/*.html").on('change', browserSync.reload);
});

gulp.task('less', function() {
    return gulp.src('./src/less/**/*.less')
               .pipe(sourcemaps.init())
               .pipe(less({
                    paths: [ path.join(__dirname, 'less','src') ],
                    plugins: [autoprefix]
                }))
               .pipe(sourcemaps.write())
               .pipe(gulp.dest('./src/css'));
});

gulp.task('default', ['serve'], function() {
});