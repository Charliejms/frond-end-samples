var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
const sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');


var jsFiles = ['src/js/*.js', 'src/js/**/*.js'];
var jsDestFiles ='dist/js/';
//Task concat JavaScript
gulp.task('concat-js', function () {
    gulp.src(jsFiles)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(jsDestFiles))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(notify({
            title: 'Concat JS',
            message:'Concatenated 🗣'
        }))
        .pipe(browserSync.stream())
});

var sassFiles ='src/scss/*.scss';
var htmlFiles = '*.html';

gulp.task('default', ['concat-js','compile-scss'],function () {
    //start Browser sync
    browserSync.init({
        server: './'
    });
    gulp.watch(sassFiles, ['compile-scss']);
    gulp.watch(htmlFiles).on('change', browserSync.reload);
    gulp.watch(jsFiles, ['concat-js']);
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
