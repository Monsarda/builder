'use strict';

let gulp = require('gulp'),
	less = require('gulp-less'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat');

gulp.task('css-dev', function(){
	gulp.src('assets/less/**/*.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(autoprefixer({
            browsers: ['last 25 versions'],
            cascade: true
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('public/css'));
});

gulp.task('watch', function(){
  	gulp.watch('assets/less/index.less', ['css-dev']);
});