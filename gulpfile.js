var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
const sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var jsonServer = require("gulp-json-srv");
var babel = require('gulp-babel');
let run = require('gulp-run');

gulp.task('run-server-python', function () {
    //return run('python server.py').exec();
});

 var serverJson = jsonServer.create({
     port: 3004,
     baseUrl: '/api'
 });

var jsFiles = ['src/js/*.js', 'src/js/**/*.js'];
var jsDestFiles ='dist/js/';
//Task concat JavaScript
gulp.task('concat-js', function () {
    gulp.src('src/js/app.js')
        .pipe(babel()) // transpile js
        .pipe(tap(function (file) { // allow ren code got each  selected file before file
            file.contents = browserify(file.path).bundle(); // pass file to import the require elemen ts
        }))
        .pipe(buffer())// transform file in stream
        .pipe(gulp.dest(jsDestFiles))
        .pipe(notify({
            title: 'Concat JS',
            message:'Concatenated 🗣'
        }))
        .pipe(browserSync.stream())
});

var sassFiles ='src/scss/*.scss';
var htmlFiles = '*.html';

gulp.task('default', ['concat-js','compile-scss', 'copy-font'],function () {
    //start Browser sync
    browserSync.init({
        //server: './',
        proxy: "127.0.0.1:8000",
        browser: "google chrome"
    });
    gulp.watch(sassFiles, ['compile-scss']);
    gulp.watch(htmlFiles).on('change', browserSync.reload);
    gulp.watch(jsFiles, ['concat-js']);
    run('python server.py').exec();
    //return gulp.src('db.json').pipe(serverJson.pipe());
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
// Import Font Awesome
gulp.task('copy-font', function () {
    gulp.src('node_modules/sassy-font-awesome/fonts/fontawesome-webfont.*')
        .pipe(gulp.dest('./dist/fonts/'))
});