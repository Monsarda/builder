'use strict';

let gulp = require('gulp'),
	less = require('gulp-less'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
    rigger = require('gulp-rigger'),
    gutil = require('gulp-util'),
    chalk = require('chalk');

// Используем Enter Point для последовательной компиляции
gulp.task('watch-css-dev', function(){
    gulp.watch('assets/less/index.less', function(){
        gulp.src('assets/less/index.less')
        .pipe(sourcemaps.init())
        .pipe(less()).on('error', function(error) {
            gutil.log('Error Less: ', '\'' + chalk.red(error.message));
        })
        .pipe(autoprefixer({
            browsers: ['last 25 versions'],
            cascade: true
        }))
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/css')).on('end', function() {
            gutil.log(chalk.green('Success Less Compilation'));
        });
    });
});

gulp.task('watch-js-dev', function(){
    gulp.watch('assets/js/**/*.js', function(){
        gulp.src('assets/js/**/*.js')
            .pipe(sourcemaps.init())
            .pipe(concat('script.js'))
            .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/js')).on('end', function() {
            gutil.log(chalk.green('Success JavaScript Compilation'));
        })
    });
});

gulp.task('watch-html-dev', function(){
    gulp.watch('assets/html/**/*.html', function(){
        gulp.src('assets/html/*.html')
            .pipe(rigger())
        .pipe(gulp.dest('public')).on('end', function() {
            gutil.log(chalk.green('Success HTML Compilation'));
        })
    });
});

gulp.task('default', ['watch-css-dev','watch-js-dev','watch-html-dev']);