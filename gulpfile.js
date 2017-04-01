var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');

var path = {
    HTML: [
        'src/*.html',
        'src/views/**/*.html',
        'src/views/*.html',
        'src/favicon.png'
    ],
    JS: [
        'src/js/*.js',
        'src/js/**/*.js'
    ],
    CSS: [
        'src/css/*.css',
        'node_modules/font-awesome/css/*.css',
        'node_modules/angular-material/angular-material.css'

    ],
    FONTS: [
        'node_modules/font-awesome/fonts/*'

    ],
    IMG: [
        'src/img/*'
    ],
    VENDOR: [
        'node_modules/angular/angular.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-aria/angular-aria.js',
        'node_modules/angular-material/angular-material.js',
        'node_modules/angular-messages/angular-messages.js'
    ],
    DIST: './dist'
};

gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        port: 4005
    });
});

gulp.task('html', function() {
    gulp.src(path.HTML, { base: 'src' })
        .pipe(gulp.dest(path.DIST));
});

gulp.task('js', function() {
    gulp.src(path.JS)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(path.DIST + '/js'));
});

gulp.task('css', function() {
    gulp.src(path.CSS)
        .pipe(gulp.dest(path.DIST + '/css'));
});

gulp.task('fonts', function() {
    gulp.src(path.FONTS)
        .pipe(gulp.dest(path.DIST + '/fonts'));
});

gulp.task('img', function() {
    gulp.src(path.IMG)
        .pipe(gulp.dest(path.DIST + '/img'));
});

gulp.task('vendor', function() {
    gulp.src(path.VENDOR)
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.DIST + '/js'));
});

gulp.task('clean', function() {
    return gulp.src('./dist/*', { force: true })
        .pipe(clean());
});

gulp.task('watch', function() {
    gulp.watch(path.VENDOR, ['vendor']);
    gulp.watch(path.JS, ['js']);
    gulp.watch(path.HTML, ['html']);
    gulp.watch(path.IMG, ['img']);
})

var generate = ['connect', 'html', 'js', 'css', 'img', 'vendor', 'fonts', 'watch'];

gulp.task('run', generate);