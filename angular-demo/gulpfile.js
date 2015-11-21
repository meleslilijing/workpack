'use strict'

var gulp = require('gulp');
var browserSync = require('browser-sync');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var ngAnnotate = require('gulp-ng-annotate');
var ngmin = require('gulp-ngmin');

/**
 * gulp dev		开发中
 * gulp build 	构建
 */

gulp.task('dev', ['browser-sync', 'compile']);

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: './src'
		}
	});

	gulp.watch(['./src/styl/*.styl', './src/js/*.js', './src/index.html'], ['watch']);
});

gulp.task('watch', ['compile'], function() {
	console.log('----- watch -----');
	browserSync.reload();
});

gulp.task('css', function() {
	return gulp.src('./src/styl/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./src/css'))
		.pipe(concat('bundle.min.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest('./src/assets'))
});

gulp.task('js', function() {
	return gulp.src('./src/js/*.js')
		.pipe(ngAnnotate())
		.pipe(ngmin({dynamic: false}))
		.pipe(uglify({outSourceMap:true}))
		.pipe(concat('bundle.min.js'))
		.pipe(gulp.dest('./src/assets'))
});

gulp.task('compile', ['css', 'js']);

gulp.task('copyfile', ['css', 'js'], function() {
	gulp.src('./src/index.html')
		.pipe(gulp.dest('./app/'))

	gulp.src('./src/assets/*')
		.pipe(gulp.dest('./app/assets/'))

	gulp.src('./src/lib/*')
		.pipe(gulp.dest('./app/lib/'))

});

// 文件添加md5后缀，同时生产 rev-manifest.json文件
gulp.task('rev', ['copyfile'], function() {
	return gulp.src(['./app/assets/bundle.min.css', './app/assets/bundle.min.js'])
		.pipe(rev())
		.pipe(gulp.dest('./app/assets'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./app/'))
});

// 替换index.js中的文件名
gulp.task('replace', ['rev'], function() {
	return gulp.src(['./app/rev-manifest.json', './app/index.html'])
		.pipe(revCollector())
		.pipe(gulp.dest('./app'));
})

gulp.task('build', ['replace']);



// gulp.task('default');