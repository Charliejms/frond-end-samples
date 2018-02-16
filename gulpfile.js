var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
const sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();

// Run multiples task
gulp.task('all', ['default']);
// Run task before
gulp.task('css-link', ['compile-sample'], function () {
});
gulp.task('samples', ['task1'], function () {

});
var sassFiles ='src/scss/*.scss';
var htmlFiles = '*.html';

gulp.task('default', ['compile-scss'],function () {
    //start Browser sync
    browserSync.init({
        server: './'
    });
    gulp.watch(sassFiles, ['compile-scss']);
    gulp.watch(htmlFiles).on('change', browserSync.reload)
});
// task SASS
gulp.task('compile-scss', function () {
    sass('src/scss/style.scss', { sourcemap: true})
        .on('error', sass.logError) //Show error in SASS
        // for inline sourcemaps
        .pipe(sourcemaps.write())
         // for file sourcemaps
        .pipe(sourcemaps.write('maps', {
             includeContent: false,
             sourceRoot: 'source'
        }))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(notify({
            title: 'SASS',
            message:'Compiled 🤟🏽'
        }))
        .pipe(browserSync.stream())
});
