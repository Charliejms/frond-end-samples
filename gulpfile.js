const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const tap = require('gulp-tap');
const buffer = require('gulp-buffer');
const jsonServer = require("gulp-json-srv");
const babel = require('gulp-babel');
const run = require('gulp-run');
const uglify = require('gulp-uglify-es').default;
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const imagemin = require('gulp-imagemin');
const responsive = require('gulp-responsive-images');
const spritesmith = require('gulp.spritesmith');


// variables:
const htmlFiles = '*.html';
// SASS Config
const sassConfig = {
    in: 'src/scss/style.scss',
    out: './dist/css/',
    watch: 'src/scss/**/*',
    sourcemaps: 'maps',
};
//JS Config
const jsConfig = {
    in: 'src/js/app.js',
    out: 'dist/js/',
    watch: ['src/js/*.js', 'src/js/**/*.js'],
    sourcemaps: './',
};
// Fonts Config
const fontAwesomeConfig = {
    in: 'node_modules/sassy-font-awesome/fonts/fontawesome-webfont.*',
    out: './dist/fonts/'
};
// IMG
// Config images responsive
const imgConfig = {
    in : ['src/img/*', 'src/img/**/*'],
    out: 'dist/img/',
    watch: ['src/img/*', 'src/img/**/*'],
    responsiveOpts : {
        "assets/*": [
            { width: 375, rename: { suffix: '-xs' }, withoutEnlargement:false, skipOnEnlargement: true },
            { width: 768, rename: { suffix: '-sm' }, withoutEnlargement:false, skipOnEnlargement: true },
            { width: 1024, rename: { suffix: '-md' }, withoutEnlargement:false, skipOnEnlargement: true },
            { width: 1200, rename: { suffix: '-lg' }, withoutEnlargement:false, skipOnEnlargement: true },
            { width: 1536, rename: { suffix: '-@2x' }, withoutEnlargement:false, skipOnEnlargement: true },
            { width: 2048, rename: { suffix: '-@3x' }, withoutEnlargement:false, skipOnEnlargement: true }
        ],
        "avatars/*": [
            { width: 35, height:35, withoutEnlargement:false, skipOnEnlargement: true },
            { width: 70, height:70, rename: { suffix: '@2x' }, withoutEnlargement:false, skipOnEnlargement: true },
            { width: 105, height:105, rename: { suffix: '@3x' }, withoutEnlargement:false, skipOnEnlargement: true },
        ]
    },
};
// Sprites config
const spriteConfig = {
    in: 'src/img/sprites/*',
    watch : 'src/img/sprites/*',
    outImg: './dist/img/',
    outSass:'./src/scss/',
    nameSprite: 'sprite.png',
    scssSprite: '_sprite.scss',
    imgPathSprite: '../img/sprite.png'
};

//optimización de images de usuario. No es una opcion para produccion. (not necessary)
let uploadedImages  = ['uploads/*.png', 'uploads/*.jpg', 'uploads/*.gif', 'uploads/*.svg'];
let assetImages = ['src/img/assets/*.png', 'src/img/assets/*.jpg', 'src/img/assets/*.gif', 'src/img/assets/*.svg'];


// task SASS
gulp.task('compile-scss', function () {
    sass(sassConfig.in,).on('error', sass.logError) //Show error in SASS
        .pipe(postcss([
            autoprefixer(), // It will be faster, as the CSS is parsed only once for all PostCSS based tools
            cssnano() // minifier css
        ]))
        .pipe(sourcemaps.write('maps', {
            includeContent: false,
            sourceRoot: 'source'
        }))
        .pipe(gulp.dest(sassConfig.out))
        .pipe(notify({
            title: 'SASS',
            message:'Compiled 🤟🏽'
        }))
        .pipe(browserSync.stream())
});

//Task concat JavaScript
gulp.task('concat-js', function () {
    gulp.src(jsConfig.in)
        .pipe(sourcemaps.init())
        .pipe(tap(function (file) { // allow ren code got each  selected file before file
            file.contents = browserify(file.path).bundle(); // pass file to import the require elemen ts
        }))
        .pipe(buffer())// transform file in stream
        .pipe(babel()) // transpile js
        .pipe(uglify()) // minifier JS
        .pipe(sourcemaps.write(jsConfig.sourcemaps))
        .pipe(gulp.dest(jsConfig.out))
        .pipe(notify({
            title: 'Concat JS',
            message:'Concatenated 🗣'
        }))
        .pipe(browserSync.stream())
});

// Import Font Awesome
gulp.task('copy-font', function () {
    gulp.src(fontAwesomeConfig.in)
        .pipe(gulp.dest(fontAwesomeConfig.out))
        .pipe(notify({
            title: "Fonts",
            message: "Fonts moved 🤘"
    }));
});

// Task Responsive img
// config quality to imagemin()

gulp.task('responsive-images', function () {
    gulp.src(imgConfig.in)
        .pipe(responsive(imgConfig.responsiveOpts))
        .pipe(imagemin())
        .pipe(gulp.dest(imgConfig.out))
});

gulp.task('uploaded-images-optimization', function () {
    gulp.src(uploadedImages)
        .pipe(imagemin())
        .pipe(gulp.dest('./uploads/'))
});

// Asset optimization (for static images) to PROD
gulp.task('asset-images-optimizations', function () {
    gulp.src(assetImages)
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img/'));
});

//Create sprite images
gulp.task('sprite', function () {
    let spriteDate = gulp.src(spriteConfig.in)
        .pipe(spritesmith({
            imgName: spriteConfig.nameSprite,
            cssName: spriteConfig.scssSprite,
            imgPath: spriteConfig.imgPathSprite
        }));
    spriteDate.img.pipe(buffer()).pipe(imagemin()).pipe(gulp.dest(spriteConfig.outImg));
    spriteDate.css.pipe(gulp.dest(spriteConfig.outSass));
});

// Server
gulp.task('run-server-python', function () {
    return run('python server.py').exec();
});

let serverJson = jsonServer.create({
    port: 3004,
    baseUrl: '/api'
});

// default task
gulp.task('default', ['concat-js','sprite','compile-scss', 'copy-font', 'asset-images-optimizations'],function () {
    //start Browser sync
    browserSync.init({
        //server: './',
        proxy: "127.0.0.1:8000",
        browser: "google chrome"
    });
    gulp.watch(sassConfig.watch, ['compile-scss']);
    gulp.watch(htmlFiles).on('change', browserSync.reload);
    gulp.watch(jsConfig.watch, ['concat-js']);
    //optimize static images to prod
    gulp.watch(assetImages, ['asset-images-optimizations']);
    // watch change sprites Dir
    gulp.watch(sassConfig.watch, ['sprite']);
    //Server python
    run('python server.py').exec();
    //server node js
    //return gulp.src('db.json').pipe(serverJson.pipe());
});