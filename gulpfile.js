var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
const sourcemaps = require('gulp-sourcemaps');

// Run multiples task
gulp.task('all', ['default']);
// Run task before
gulp.task('css-link', ['compile-sample'], function () {
});
gulp.task('samples', ['task1'], function () {

});

gulp.task('default', function () {
    console.log('Hello friend.');
    var sassFiles  ='./src/scss/*.scss';
    gulp.watch(sassFiles, ['compile-scss']);
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
});

gulp.task('concat-js', function () {

});