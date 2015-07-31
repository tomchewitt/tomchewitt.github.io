// LOAD IN REQS
var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	watchify = require('watchify'),
	gutil = require('gulp-util'),
	sass = require('gulp-ruby-sass'),
	size = require('gulp-size'),
	filter = require('gulp-filter'),
	eslint = require('gulp-eslint'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	streamify = require('gulp-streamify');


// THEMENAME
var THEMENAME = 'reporting';


// FUNCTIONS
var watch,
	F = {
	_browserify: function() {
		var b = browserify({
			cache: {},
			packageCache: {},
			fullPaths: false,
			debug: true
		});

		if (watch) {
			// if watch is enable, wrap this bundle inside watchify
			b = watchify(b);
			b.on('update', function(){
				F._bundle(b);
			});
		}

		b.add('./wp-content/themes/' + THEMENAME + '/asset/src/js/app.js');
		F._bundle(b);
	},
	_bundle: function(b) {
		var start = Date.now();
		b.bundle()
			.on('error', function(err) {
				gutil.log(gutil.colors.blue('ERROR: ' + err.message));
				this.emit('end');
				})
			.pipe(source('bundle.js'))
			.pipe(gulp.dest('./wp-content/themes/' + THEMENAME + '/asset/js'))
			.pipe(streamify(uglify()))
			.pipe(rename('bundle.min.js'))
			.pipe(gulp.dest('./wp-content/themes/' + THEMENAME + '/asset/js'));

		gutil.log(gutil.colors.blue('[Browserify] ') + (Date.now() - start) + 'ms ' + size());
	}
}


// SETUP TASKS
gulp.task('browserify-nowatch', function(){
	watch = false;
	F._browserify();
});

gulp.task('browserify-watch', function(){
	watch = true;
	F._browserify();
});


// LINTING
gulp.task('lint', function() {
	return gulp.src('./wp-content/themes/' + THEMENAME + '/asset/src/js/**/*.js')
		.pipe(eslint())
		.pipe(eslint.format('stylish'));
});


// STYLES
gulp.task('styles', function () {
	return sass('./wp-content/themes/' + THEMENAME + '/asset/src/sass/bundle.scss', { style: 'compressed' })
			.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'ios 6', 'android 4'))
			.pipe(size())
			.pipe(gulp.dest('./wp-content/themes/' + THEMENAME + '/asset/css'))
			.pipe(filter('**/*.css'))
			.pipe(rename('bundle.min.css'))
			.pipe(gulp.dest('./wp-content/themes/' + THEMENAME + '/asset/css'));
});


// WATCH TASK
gulp.task('watch', ['browserify-watch'], function() {
	gulp.watch('./wp-content/themes/' + THEMENAME + '/asset/src/js/**/*.js', ['lint']);
	gulp.watch('./wp-content/themes/' + THEMENAME + '/asset/src/sass/**/*.scss', ['styles']);
});

