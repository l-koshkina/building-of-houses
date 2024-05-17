'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');

gulp.task('less', () => {
    return gulp.src('./styles/*.less')
        .pipe(less())
        .pipe(concatCss("style.css"))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist'));
});

exports.default = gulp.series('less');
exports.watch = function () {
    gulp.watch('./styles/*.less', gulp.series('less'));
}

