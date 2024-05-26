const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprites');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const path = require('path');
const rename = require("gulp-rename");

//  SVG Minify
//  -----------------------------------------------------------
gulp.task('sprites', function () {
    return gulp.src('./src/Assets/icons/*.svg')
        .pipe(svgSprite({mode: "symbols"}))
        .pipe(gulp.dest("./src/assets/icons/sprite"));
});