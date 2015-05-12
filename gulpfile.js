var gulp = require('gulp'),
    gutil = require('gulp-util'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    concat = require('gulp-concat'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    inject = require('gulp-inject'),
    path = require('path'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var env,
    jsSources,
    sassSources,
    htmlSources,
    outputDir,
    sassStyle;

env = 'production';

if (env==='development') {
  outputDir = 'builds/development/';
  sassStyle = 'expanded';
} else {
  outputDir = 'builds/production/';
  sassStyle = 'compressed';
}

jsSources = [
  'components/scripts/TweenMax.min.js',
  'components/scripts/jquery.scrollmagic.min.js',
  'components/scripts/script.js'
];
sassSources = ['components/sass/style.scss'];
htmlSources = [outputDir + '*.html'];

gulp.task('browser-sync', function() {
    browserSync({
        server: {
          baseDir: outputDir
        }
    });
});

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .on('error', gutil.log)
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir + 'js'))
});

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      css: outputDir + 'css',
      image: outputDir + 'images',
      style: sassStyle,
      require: ['susy', 'breakpoint']
    })
    .on('error', gutil.log))
//    .pipe(gulp.dest( outputDir + 'css'))
//   .pipe(connect.reload())
    .pipe(browserSync.reload({stream:true})); //BrowserSync
});

gulp.task('svgstore', function () {
    var svgs = gulp
        .src(outputDir + 'images/svg/*.svg')
        .pipe(svgmin())
        .pipe(svgstore({ inlineSvg: true }));

    function fileContents (filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src(outputDir + 'index.html')
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest(outputDir));
});

//BrowserSync
gulp.task('bs-reload', function () {
  browserSync.reload();
});


gulp.task('watch', function() {
  gulp.watch(jsSources, ['bs-reload']);
  gulp.watch(['components/sass/*.scss', 'components/sass/*/*.scss'], ['compass']);
  gulp.watch(outputDir + 'images/svg/*.svg', ['bs-reload']);
  gulp.watch('builds/development/*.html', ['bs-reload']);
});

//gulp.task('connect', function() {
//  connect.server({
//    root: outputDir,
//    livereload: true
//  });
//});

gulp.task('html', function() {
  gulp.src('builds/development/*.html')
    .pipe(gulpif(env === 'production', minifyHTML()))
    .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
    .pipe(connect.reload())
});

// Copy images to production
gulp.task('move', function() {
  gulp.src('builds/development/images/**/*.*')
  .pipe(gulpif(env === 'production', gulp.dest(outputDir+'images')))
});

gulp.task('default', ['browser-sync', 'watch', 'html', 'js', 'compass', 'svgstore', 'move']);
