'use strict';

let gulp = require('gulp'),
    // Компилятор LESS
	less = require('gulp-less'),
    // Карта исходников
	sourcemaps = require('gulp-sourcemaps'),
    // Вендорные префиксы
	autoprefixer = require('gulp-autoprefixer'),
    // Конкатенация файлов
	concat = require('gulp-concat'),
    // Инклуд
    rigger = require('gulp-rigger'),
    // Watcher custom
    watch = require('gulp-watch'),
    // Ловим ошибки
    plumber = require('gulp-plumber'),
    // Уведомления
    notify = require('gulp-notify'),
    // JS Валидатор
    jsValidate = require('gulp-jsvalidate'),
    // IMG Min
    imagemin = require('gulp-imagemin'),
    // HTML Validator
    htmlhint = require('gulp-htmlhint'),
    cleanCss = require('gulp-clean-css');

let path = {

    build: {
        html: 'build/',
        css: 'build/css/',
        js: 'build/js/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/html/*.html',
        style: 'src/less/index.less',
        js: 'src/js/*.js',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/html/**/*.html',
        style: 'src/less/**/*.less',
        js: 'src/js/*.js',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    }
}

// BUILD //
gulp.task('style:build', function () {
    return watch(path.watch.style, function(){
        gulp.src(path.src.style)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sourcemaps.init())
        .pipe(less())   
        .pipe(autoprefixer({
            browsers: ['last 50 versions']
        }))
        .pipe(concat('style.css'))
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.build.css))
        .pipe(notify('Less Compilation Done'));
    });
});

gulp.task('js:build', function () {
    return watch(path.watch.js, function(){
        gulp.src(path.src.js)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(jsValidate())
        .pipe(notify('JavaScript Finish'))
        .pipe(sourcemaps.init())
        .pipe(gulp.dest(path.build.js+'paths'))
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.build.js));
        
    });
});

gulp.task('image:build', function () {
    return watch(path.watch.img, function(){
        gulp.src(path.src.img)
        .pipe(plumber())
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [{removeViewBox: true}]
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(notify('Images Finish'));
        
    });
});

gulp.task('html:build', function () {
    return watch(path.watch.html, function(){
        gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(htmlhint())
        .pipe(htmlhint.failReporter())
        .pipe(gulp.dest(path.build.html))
        .pipe(notify('Html Finish'));
        
    });
});

gulp.task('fonts:build', function () {
    return watch(path.watch.html, function(){
        gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(notify('Fonts Finish'))
        
    });
});


gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

