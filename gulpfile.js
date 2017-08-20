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
    // Min CSS
    cleanCss = require('gulp-clean-css'),
    // Web Server
    connect = require('gulp-connect'),
    // Rename
    rename = require('gulp-rename'),
    // Paths
    path = require('./paths'),
    // Configs
    config = require('./config'),
    // Messages
    mess = require('./messages');

gulp.task('server:build', function () {
    connect.server(config.server);
});

// BUILD //
gulp.task('style:build', function () {
    return watch(path.watch.style, function(){
        gulp.src(path.src.style)
        .pipe(plumber({errorHandler: notify.onError(mess.style.error)}))
        .pipe(sourcemaps.init())
        .pipe(less())   
        .pipe(autoprefixer({
            browsers: ['last 50 versions']
        }))
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.build.style))
        .pipe(notify(mess.style.success))
        .pipe(connect.reload());
    });
});

gulp.task('js:build', function () {
    return watch(path.watch.js, function(){
        gulp.src(path.src.js)
        .pipe(plumber({errorHandler: notify.onError(mess.js.error)}))
        .pipe(jsValidate())
        .pipe(notify(mess.js.success))
        .pipe(sourcemaps.init())
        .pipe(gulp.dest(path.build.js+'paths'))
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.build.js))
        .pipe(connect.reload());
        
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
        .pipe(notify(mess.image.success))
        .pipe(connect.reload());
        
    });
});

gulp.task('html:build', function () {
    return watch(path.watch.html, function(){
        gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(htmlhint({
            "attr-value-not-empty": true,
            "attr-no-duplication": true,
            "tag-pair": true,
            "id-unique": true,
            "doctype-html5": true,
        }))
        .pipe(htmlhint.reporter())
        .pipe(gulp.dest(path.build.html))
        .pipe(notify(mess.html.success))
        .pipe(connect.reload());
        
    });
});

gulp.task('fonts:build', function () {
    return watch(path.watch.fonts, function(){
        gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(notify(mess.fonts.success))
        .pipe(connect.reload());
    });
});

gulp.task('files:build', function () {
    return watch(path.watch.files, function(){
        gulp.src(path.src.files)
        .pipe(gulp.dest(path.build.files))
        .pipe(notify(mess.files.success))
        .pipe(connect.reload());
    });
});

gulp.task('libs:build', function () {
    return watch(path.watch.libs, function(){
        gulp.src(path.src.libs)
        .pipe(gulp.dest(path.build.libs))
        .pipe(notify(mess.libs.success))
        .pipe(connect.reload());
    });
});

gulp.task('build', [
    'server:build',
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'files:build',
    'libs:build'
]);

gulp.task('compress', [
    'img:compress',
]);

