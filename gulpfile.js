var gulp          = require('gulp'),
	webpack       = require('gulp-webpack'),
	less          = require('gulp-less'),
	minifyJs      = require('gulp-uglify'),
	minifyHTML    = require('gulp-htmlmin'),
	minifyCss     = require('gulp-minify-css'),
	minifyImg     = require('gulp-imagemin'),
	sprite        = require('gulp.spritesmith'),
	webpackConfig = require('./webpack.config'),
	del           = require('del'),
	plumber       = require('gulp-plumber'),
	cache         = require('gulp-cache'),
	obfuscate     = require('gulp-obfuscate'),
	jfogs         = require('jfogs'),
	path          = {
						dev: 'dev/',
						dest: 'dest/'
					}

//js
gulp.task('js', function () {
  gulp.src(path.dev+'dev/')
    .pipe(webpack(webpackConfig))
	.pipe(minifyJs())
    .pipe(gulp.dest('./dest'));
});

//less
gulp.task('less', function () {
    gulp
		.src(path.dev+'styles/styles.less')
		.pipe(plumber(function(error){
			console.log(error);
			console.log('--------------------------  less Syntax Error! --------------------------');
		}))
		.pipe(less())
		.pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(path.dest+'styles'));
});

//html
gulp.task('html', function() {
	gulp.src(path.dev+'views/**/**.html')
        .pipe(minifyHTML({
            removeComments : true ,
            collapseWhitespace : true
        }))
        .pipe(gulp.dest(path.dest+'views'));
});

//清理图片
gulp.task('clean', ['clean:html','clean:imagesDefault', 'clean:imagesSprite']);

gulp.task('clean:html', function() {
	del([path.dest+'views/**'])
});

gulp.task('clean:imagesDefault', function() {
	del([path.dest+'images/default/*.{png,jpg,jpeg,gif}'])
});

gulp.task('clean:imagesSprite', function() {
	del([path.dest+'images/sprite/*.{png,jpg}'])
});

//复制文件
gulp.task('copy', ['clean', 'copy:js', 'copy:images']);

gulp.task('copy:js', function(){
	gulp
		.src(path.dev+'lib/*')
		.pipe(gulp.dest(path.dest+'lib/'));
});

gulp.task('copy:images', function(){
	gulp
		.src(path.dev+'images/default/**/*.{png,jpg,jpeg,gif}')
		.pipe(cache(minifyImg({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest(path.dest+'images/'));
});

//sprite
gulp.task('sprite', ['sprite:png', 'sprite:jpg']);

//合并png
gulp.task('sprite:png', ['clean:imagesSprite'], function () {	
	var spriteData = gulp
						.src(path.dev+'images/sprite/**.png')
						.pipe(sprite({
							imgName: 'sprite.png',
							cssName: 'sprite-png.css',
							cssTemplate: path.dev+'less/core/handlebarsStr.css.handlebars',
							imgPath: '../images/sprite.png'
						}));
		spriteData
			.img
			.pipe(minifyImg({
				optimizationLevel: 3,
				progressive: true,
				interlaced: true
			}))
			.pipe(gulp.dest(path.dest+'images/'));
		
		spriteData
			.css
			.pipe(gulp.dest(path.dev+'less/core/'));
});

//合并jpg
gulp.task('sprite:jpg', ['clean:imagesSprite'], function () {
	var spriteData = gulp
						.src(path.dev+'sprite/*.jpg')
						.pipe(sprite({
							imgName: 'sprite.jpg',
							cssName: 'sprite-jpg.css',
							cssTemplate: path.dev+'less/core/handlebarsStr.css.handlebars',
							imgPath: '../images/sprite.jpg'
						}));
		spriteData
			.img
			.pipe(minifyImg({
				optimizationLevel: 3,
				progressive: true,
				interlaced: true
			}))
			.pipe(gulp.dest(path.dest+'images/'));
		
		spriteData
			.css
			.pipe(gulp.dest(path.dev+'less/core/'));
});


//默认任务
gulp.task('default', ['clean', 'copy', 'html', 'sprite',  'js'], function(){
	
	//监听不合并图片
	gulp.watch(path.dev+'images/default/**', ['copy:images']);
	
	//监听sprite png
	gulp.watch(path.dev+'images/sprite/*.png', ['sprite:png']);
	
	//监听sprite jpg
	gulp.watch(path.dev+'images/sprite/*.jpg', ['sprite:jpg']);
	
	//监听js
    gulp.watch('./dev/scripts/**', ['js']);
	gulp.watch('./dev/*.js', ['js']);
	
    //监听less
    gulp.watch(path.dev+'styles/**', ['less']);
	
	//监听html
    gulp.watch(path.dev+'views/**', ['html']);
	
});
