var gulp    = require('gulp')				
var webpack = require('gulp-webpack');
var uglify  = require('gulp-uglify');
var config  = require('./webpack.config');
	
gulp.task('js', function () {
  gulp.src('./dev/')
    .pipe(webpack(config))
	.pipe(uglify())
    .pipe(gulp.dest('./dest'));
});


//默认任务
gulp.task('default', ['js'], function(){
	
	//监听js
    gulp.watch('./dev/scripts/**', ['js']);
	gulp.watch('./dev/*.js', ['js']);
	
});