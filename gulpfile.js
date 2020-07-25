const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const webpackConfig = require("./webpack.config");

gulp.task('browser-sync', function(done) {
  browserSync.init({
    server: {
      baseDir: './dist/',
      index: 'index.html'
    }
  });
  done();
});

gulp.task('reload', function(done) {
  browserSync.reload();
  done();
});

gulp.task('sass', function() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(cleanCSS())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
});

gulp.task('bundle', function() {
  return webpackStream(webpackConfig, webpack)
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watch', function(done) {
  gulp.watch('./src/scss/**/*scss', gulp.task('sass'));
  gulp.watch('./src/js/**/*js', gulp.task('bundle'));
  gulp.watch(['./dist/*.html', './dist/css/*.css', './dist/js/*.js'], gulp.task('reload'));
  done();
});

gulp.task('default', gulp.series('sass', 'bundle', 'browser-sync', 'watch', function(done) {
  done();
}));
