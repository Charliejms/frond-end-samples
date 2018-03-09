let gulp = require('gulp');
let sass = require('gulp-ruby-sass');
const sourcemaps = require('gulp-sourcemaps');
let notify = require('gulp-notify');
let browserSync = require('browser-sync').create();
let browserify = require('browserify');
let tap = require('gulp-tap');
let buffer = require('gulp-buffer');
let jsonServer = require("gulp-json-srv");
let babel = require('gulp-babel');
let run = require('gulp-run');
let uglify = require('gulp-uglify-es').default;
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let cssnano = require('cssnano');
let imagemin = require('gulp-imagemin');



// variables
//optimización de images de usuario. No es una opcion para produccion.
let uploadedImages  = ['uploads/*.phg', 'uploads/*.jpg', 'uploads/*.gif', 'uploads/*.svg'];
let assetImages = ['src/img/*.phg', 'src/img/*.jpg', 'src/img/*.gif', 'src/img/*.svg'];

gulp.task('default', ['concat-js','compile-scss', 'copy-font', 'asset-images-optimizations'],function () {
    //start Browser sync
    browserSync.init({
        //server: './',
        proxy: "127.0.0.1:8000",
        browser: "google chrome"
    });
    gulp.watch(sassFiles, ['compile-scss']);
    gulp.watch(htmlFiles).on('change', browserSync.reload);
    gulp.watch(jsFiles, ['concat-js']);
    //optimize static images to prod
    gulp.watch(assetImages, ['asset-images-optimizations']);
    run('python server.py').exec();
    //return gulp.src('db.json').pipe(serverJson.pipe());
});

gulp.task('run-server-python', function () {
    return run('python server.py').exec();
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
        .pipe(sourcemaps.init())
        .pipe(tap(function (file) { // allow ren code got each  selected file before file
            file.contents = browserify(file.path).bundle(); // pass file to import the require elemen ts
        }))
        .pipe(buffer())// transform file in stream
        .pipe(babel()) // transpile js
        .pipe(uglify()) // minifier JS
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(jsDestFiles))
        .pipe(notify({
            title: 'Concat JS',
            message:'Concatenated 🗣'
        }))
        .pipe(browserSync.stream())
});

var sassFiles ='src/scss/*.scss';
var htmlFiles = '*.html';


// task SASS
let cssFilesSource = 'src/scss/style.scss';
let cssFileDest = './dist/css/';
gulp.task('compile-scss', function () {
    sass('src/scss/style.scss', {
        sourcemap: true}
        ).on('error', sass.logError) //Show error in SASS
         // for file sourcemaps
        .pipe(postcss([
            autoprefixer(), // It will be faster, as the CSS is parsed only once for all PostCSS based tools
            cssnano() // minifier css
        ]))
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



gulp.task('uploaded-images-optimization', function () {
    gulp.src(uploadedImages)
        .pipe(imagemin())
        .pipe(gulp.dest('./uploads/'))
});

// Asset optimization (for static images) to PROD
// config quality to imagemin()
gulp.task('asset-images-optimizations', function () {
    gulp.src(assetImages)
        .pipe(imagemin())
        .pipe('./dist/img/');
});