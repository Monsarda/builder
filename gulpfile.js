'use strict';

let gulp = require('gulp'),
	less = require('gulp-less'),
	sourcemaps = require('gulp-sourcemaps');

gulp.task('less', function(){
	gulp.src('assets/less/**/*.less')
		.pipe(sourcemaps.init())
			.pipe(less())
		.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('public/css'));
});

gulp.task('watch', function(){
  	gulp.watch('assets/less/**/*.less', ['less']);
});
