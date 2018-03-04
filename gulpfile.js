const browserSync = require('browser-sync')
const clean = require('gulp-clean');
const concat = require('gulp-concat')
const gulp = require('gulp')
const jshint = require('gulp-jshint');
const minifyCSS = require('gulp-minify-css')
const minifyHTML = require('gulp-minify-html')
const prefix = require('gulp-autoprefixer')
const runSequence = require('run-sequence')
const sass = require('gulp-sass')
const stylish = require('jshint-stylish');
const watch = require('gulp-watch')
const webpack = require('gulp-webpack')

const buildDir = 'dist'
const config = {
    paths: {
        buildDir: buildDir,
        build: buildDir + '/**',
        img: ['img/**/*'],
        markdown: ['_posts/*.md'],
        html: {
            src: ['index.html'],
            build: [buildDir + '/**/*.html'],
            dest: './'
        },
        sass: {
            main: 'sass/main.sass',
            src: 'sass/*.sass',
            dest: 'css/'
        },
        css: {
            main: 'styles.css',
            src: [
                'css/main.css',
                'node_modules/bootstrap-css/lib/*.css',
            ],
            dest: buildDir + '/css/'
        },
        js: {
            main: 'src/Index.js',
            src: 'src/**/*.js',
            dest: buildDir + '/bundle.js'
        }
    }
}
config.paths.watch = [
    config.paths.html.src,
    config.paths.sass.src,
    config.paths.js.src
]

function onError(err) {
    console.log('err: ' + err)
}

gulp.task('reload', function () {
    browserSync.reload()
})

gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: './'
        },
        browser: 'Google\ Chrome'
    })
})

gulp.task('clean', function () {
    return gulp.src(config.paths.buildDir + '/*', {read: false})
        .pipe(clean());
});

gulp.task('html', function () {
    return gulp.src(config.paths.html.build, {
        base: './'
    })
        .pipe(minifyHTML())
        .pipe(gulp.dest(config.paths.html.dest))
})

gulp.task('sass', function () {
    return gulp.src(config.paths.sass.main)
        .pipe(sass({
            includePaths: [config.paths.sass.src],
            onError: onError
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest(config.paths.sass.dest))
});

gulp.task('css-concat', function () {
    return gulp.src(config.paths.css.src)
        .pipe(concat(config.paths.css.main))
        .pipe(gulp.dest(config.paths.css.dest))
});

gulp.task('css-minify', function () {
    return gulp.src(config.paths.css.dest + '/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest(config.paths.css.dest))
});

gulp.task('css-dev', function (done) {
    runSequence('css-concat', done)
});

gulp.task('css', function (done) {
    runSequence('css-concat', 'css-minify', done)
});

gulp.task('fonts', function (done) {
    return gulp.src(config.paths.fonts.src)
        .pipe(gulp.dest(config.paths.fonts.dest))
});

gulp.task('webpack', function() {
    return gulp.src(config.paths.js.main)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest(buildDir));
});

gulp.task('js-lint', function() {
  return gulp.src(config.paths.js.src)
    .pipe(jshint({
        linter: require('jshint-jsx').JSXHINT
    }))
    .pipe(jshint.reporter(stylish))
});

gulp.task('js', function (done) {
    runSequence('webpack', 'js-lint', done)
});

gulp.task('build', function (done) {
    runSequence('clean', 'html', 'sass', ['css', 'js'], done)
});

gulp.task('dev-build', function (done) {
    runSequence('clean', 'sass', ['css-dev', 'js'], 'reload', done)
});

gulp.task('dev-watch', function () {
    gulp.watch(config.paths.watch, ['dev-build'])
});

gulp.task('default', function (done) {
    runSequence('dev-build', 'dev-watch', 'serve', done)
});