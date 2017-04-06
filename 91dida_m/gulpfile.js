/* eslint-disable */
const gulp        = require('gulp');
const gutil       = require('gulp-util');
const uglify      = require('gulp-uglify');
const concat      = require('gulp-concat');
const rev         = require('gulp-rev');
const revReplace  = require('gulp-rev-replace');
const imagemin    = require('gulp-imagemin');
const replace     = require('gulp-replace');
const spritesmith = require('gulp.spritesmith');
const cleanCSS    = require('gulp-clean-css');

gulp.task('concat', () => {
  gulp.src([
    './src/js/vue2.min.js',
    './src/js/vue-router2.min.js',
    './src/js/vue-resource.min.js',
    './src/js/vuex2.min.js',
    './src/js/swipe.js'
  ])
      .pipe(uglify())
      .pipe(concat('library.js'))
      .pipe(gulp.dest('./skin/m/js'));
});

gulp.task('minimage', () => {
  gulp.src(['./src/images/*.{png,jpg}', '!./src/icons/*'])
      .pipe(imagemin())
      // .pipe(rev())
      .pipe(gulp.dest('./skin/m/images'))
});

// 正式环境
gulp.task('replace', () => {
  gulp.src('./skin/m/css/m.css')
      .pipe(replace('/src/', '//static.91dida.cn/skin/m/'))
      .pipe(cleanCSS())
      // .pipe(rev())
      .pipe(gulp.dest('./skin/m/css/'))
});

// 预发布环境
gulp.task('preReplace', () => {
  gulp.src('./skin/m/css/m.css')
      .pipe(replace('/src/', '//precdn.91dida.cn/skin/m/'))
      .pipe(cleanCSS())
      // .pipe(rev())
      .pipe(gulp.dest('./skin/m/css/'))
});

// 图片sprite
gulp.task('sprite', () => {
  gulp.src('./src/images/icons/**/*@3x.png')
      .pipe(spritesmith({
        imgName: 'icon_sprite.png',
        cssName: 'sprite.css',
        padding: 5
      }))
      .pipe(gulp.dest('./src/images/'));
})


gulp.task('online', ['concat', 'minimage', 'replace']);
gulp.task('pre', ['concat', 'minimage', 'preReplace']);
