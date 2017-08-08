'use strict';

let gulp = require('gulp'),
	less = require('gulp-less'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    chalk = require('chalk');

gulp.task('css-dev', function(){
	gulp.src('assets/less/**/*.less')
		.pipe(sourcemaps.init())
		.pipe(less()).on('error', function(error) {
            gutil.log('Error Less: ', '\'' + chalk.red(error.message));
        })
		.pipe(autoprefixer({
            browsers: ['last 25 versions'],
            cascade: true
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/css')).on('end', function() {
        gutil.log(chalk.green('Success Less Compilation'));
    });
});

gulp.task('watch', function(){
  	gulp.watch('assets/less/index.less', ['css-dev']);
});