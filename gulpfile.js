'use strict';

var gulp = require('gulp'),
	connect = require('gulp-connect'), // Runs a local dev server
	open = require('gulp-open'), // Open a URL in a web browser
	browserify = require('browserify'), // Bundle JS
	reactify = require('reactify'), // Transform React JSX to JS
	source = require('vinyl-source-stream'), // Use conventional text streams with gulp
	concat = require('gulp-concat'),
	eslint = require('gulp-eslint') // Lint JS including JSX
	;

var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		images: './src/images/*',
		mainJs: './src/main.js',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'node_modules/toastr/build/toastr.css'
		],
		dist: './dist'
	}
};

// Start a local development server
gulp.task('connect', () => {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], () => {
	gulp.src('dist/index.html')
		.pipe(open({
			uri: `${config.devBaseUrl}:${config.port}/`
		}));
});

gulp.task('html', () => {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('js', ['lint'], () => {
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(`${config.paths.dist}/scripts`))
		.pipe(connect.reload())
});

gulp.task('css', () => {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(`${config.paths.dist}/css`))
});

gulp.task('images', () => {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(`${config.paths.dist}/images`))
		.pipe(connect.reload())
});

gulp.task('lint', () => {
	return gulp.src(config.paths.js)
		.pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('watch', () => {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html', 'js', 'css', 'images', 'open', 'watch']);