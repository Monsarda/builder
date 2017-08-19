build = {
    html: 'build/',
    style: 'build/css/',
    js: 'build/js/',
    img: 'build/img/',
    fonts: 'build/fonts/',
    files: 'build/files/',
    libs: 'build/libs/'
},
src = {
    html: 'src/html/*.html',
    style: 'src/less/index.less',
    js: 'src/js/*.js',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    files: 'src/files/**/*.*',
    libs: 'src/libs/**/*.*'
},
watch = {
    html: 'src/html/**/*.html',
    style: 'src/less/**/*.less',
    js: 'src/js/*.js',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    files: 'src/files/**/*.*',
    libs: 'src/libs/**/*.*'
}

module.exports.build = build;
module.exports.src = src;
module.exports.watch = watch;