const browserSync = require('browser-sync')
const clean = require('gulp-clean');
const gulp = require('gulp')
const eslint = require('gulp-eslint');
const minifyHTML = require('gulp-minify-html')
const prefix = require('gulp-autoprefixer')
const proxy = require('proxy-middleware')
const watch = require('gulp-watch')
const webpack = require('webpack-stream')
const url = require('url');

const buildDir = 'dist'
const config = {
    paths: {
        buildDir: buildDir,
        build: buildDir + '/**',
        img: ['img/**/*'],
        markdown: ['_posts/*.md'],
        html: {
            src: 'index.html',
            build: [buildDir + '/**/*.html'],
            dest: './'
        },
        sass: {
            src: 'src/sass/*'
        },
        js: {
            main: 'src/index.jsx',
            src: 'src/**/*.jsx',
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

gulp.task('reload', function (done) {
    browserSync.reload()
    done()
})

gulp.task('browser-sync', function () {
    var proxyOptions = url.parse('http://127.0.0.1:3001')
    proxyOptions.route = '/api';

    browserSync({
        open: true,
        port: 3000,
        server: {
            baseDir: ".",
            middleware: [proxy(proxyOptions)]
        },
        browser: 'Google\ Chrome'
    });
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
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['**/*.js', '**/*.jsx', '!node_modules/**', '!dist/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError())
});

gulp.task('js', gulp.series('webpack', 'js-lint'));

gulp.task('build', gulp.series('clean', 'html', 'js'));

gulp.task('dev-build', gulp.series('clean', 'js'), 'reload');

gulp.task('dev-watch', function () {
    return watch(config.paths.watch, gulp.series('dev-build'))
});

gulp.task('default', gulp.series('dev-build', gulp.parallel('dev-watch', 'browser-sync')));