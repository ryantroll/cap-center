var gulp = require('gulp');

// var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

// gulp.task('lint', function(){
//     return gulp.src('./app/source/js/**/*.js')
//         .pipe(jshint())
//         .pipe(jshint().reporter('default'));
// })

gulp.task('sass', function(){
    return gulp.src('./app/source/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/dist/css/'));
});

gulp.task('scripts', function(){
    return gulp.src([
        // './app/source/js/vendors/jquery-1.12.3.js',
        './app/source/js/us-states.js',
        // './app/source/js/cookie-plugin.js',
        // './app/source/js/dropdown-plugin.js',
        './app/source/js/validation-plugin.js',
        './app/source/js/main.js',
        './app/source/js/01-borrower.js',
        './app/source/js/02-coborrower.js',
        './app/source/js/03-purchase.js',
        './app/source/js/04-refinance.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/dist/js/'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./app/dist/js/'))
});

gulp.task('watch', function() {
  gulp.watch('./app/source/js/**/*.js',['scripts']);
  gulp.watch('./app/source/sass/**/*.scss',['sass']);
});

gulp.task('default', ['sass', 'scripts', 'watch']);