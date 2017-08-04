'use strict';

let gulp = require('gulp'),
	less = require('gulp-less');

gulp.task('less', function(){
	gulp.src('assets/less/**/*.less')
	.pipe(less())
	.pipe(gulp.dest('public/css'));
});

gulp.task('watch', function(){
  	gulp.watch('assets/less/**/*.less', ['less']);
});
