var gulp = require ('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    fileinclude = require('gulp-file-include'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    spritesmith = require('gulp.spritesmith'),
    clean = require('gulp-clean'),
    replace = require('gulp-replace'),
    fs = require('fs');

gulp.task('default',['concat','sass','fileinclude','connect','watch']);

gulp.task('sprite', function() {
  var spriteData = gulp.src('img/sprites/*.png').pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.scss',
      algorithm: 'binary-tree',
  }));
  spriteData.img.pipe(gulp.dest('img/pngsprite'));
  spriteData.css.pipe(gulp.dest('dev/scss/temp/'));

  var spriteCheck = setInterval(function(){
      console.log('Replace paths for background images');
      fs.stat('dev/scss/temp',function(err,stat){
          if (err == null){
              console.log('Status: success');
              clearInterval(spriteCheck)
              gulp.src(['dev/scss/temp/sprite.scss'])
                  .pipe(replace('url(#{$sprite-image})', 'url(../img/pngsprite/#{$sprite-image})'))
                  .pipe(gulp.dest('dev/scss/abstracts'));
              gulp.src('dev/scss/temp')
                  .pipe(clean());
          } else{
              console.log('Wait for vendor folder, error code: '+err.code);
          }
      })
  },500)
});

gulp.task('sass', function () {
  return gulp.src('./dev/scss/style.scss')
    .pipe(plumber({
        // errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer({
			browsers: ['last 3 versions'],
			cascade: false
		}))
    .pipe(gulp.dest('./css'))
    .pipe(connect.reload());
});

gulp.task('connect',function(){
  connect.server({
    port: 1337,
    livereload: true
  });
});

gulp.task('fileinclude', function() {
  gulp.src(['./dev/templates/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('html', function () {
    gulp.src('*.html')
    .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src('css/*.css')
    .pipe(connect.reload());
});

gulp.task('concat', function() {
  return gulp.src(['./dev/js/jquery-3.2.1.min.js','./dev/js/lib/*.js'])
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});

gulp.task('watch',function(){
  gulp.watch('dev/scss/*.scss',['sass']);
  gulp.watch('dev/scss/**/*.scss',['sass']);
  gulp.watch('dev/scss/*.scss',['css']);
  gulp.watch('dev/scss/**/*.scss',['css']);
  gulp.watch('dev/chunks/*.html',['fileinclude']);
  gulp.watch('dev/templates/*.html',['fileinclude']);
  gulp.watch(['*.html'], ['html']);
  gulp.watch(['css/*.css'], ['css']);
});
