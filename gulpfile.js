// LOAD IN REQS
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	colors = require('colors/safe'),
	dateformat = require('dateformat'),
	sourcemaps = require('gulp-sourcemaps')
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	watchify = require('watchify'),
	gutil = require('gulp-util'),
	size = require('gulp-size'),
	eslint = require('gulp-eslint'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	streamify = require('gulp-streamify'),
	babelify = require('babelify'),
	watch = require('gulp-watch');


var paths = {
		maps: '../maps',
	    styles: {
	        src: '_scss',
	        files: '_scss/**/*.scss',
	        dest: 'asset/css',
	        sitedest: '_site/asset/css'
	    },
	    scripts: {
	    	src: '_js/app.js',
	    	files: '_js/**/*.js',
	    	dest: 'asset/js',
	    	sitedest: '_site/asset/js'
	    }
	},
	watch,
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

		b.add(paths.scripts.src);
		F._bundle(b);
	},
	_bundle: function(b) {
		var start = Date.now();
		b.transform(babelify)
		 	.bundle()
			.on('error', function(err) {
				gutil.log(gutil.colors.red('ERROR: ' + err.message));
				this.emit('end');
			})
			.pipe(source('bundle.js'))
			.pipe(streamify(sourcemaps.init({loadMaps: true})))
				.pipe(streamify(uglify()))
				.pipe(rename('bundle.min.js'))
			.pipe(streamify(sourcemaps.write(paths.maps)))
			.pipe(gulp.dest(paths.scripts.dest))
			.pipe(streamify(size()))
			.pipe(gulp.dest(paths.scripts.sitedest));

		gutil.log(gutil.colors.blue('[Browserify] ') + (Date.now() - start) + 'ms ');
	},
	_logger: function(e) {
		var now = new Date();
	    console.log(
	    	'[' + gutil.colors.grey(dateformat(now, 'HH:MM:ss')) + '] ' +
	    	gutil.colors.cyan.italic(e.path.split(__dirname + '/')[1]) +
	    	' : ' + e.type
	    );
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
	return gulp.src(paths.scripts.files)
		.pipe(eslint())
		.pipe(eslint.format('stylish'));
});


// STYLE TASK
gulp.task('styles', function (){
    gulp.src(paths.styles.files)
    	.pipe(sourcemaps.init())
		    .pipe(sass({
		        outputStyle: 'compressed',
		        sourceMap: 'sass',
		        includePaths : [paths.styles.src]
		    }))
		    .on('error', function(err) {
				gutil.log(gutil.colors.red('ERROR: ' + err.message));
				this.emit('end');
			})
		    .pipe(prefix('last 2 version', 'safari 5', 'ie 9', 'ios 6', 'android 4'))
		.pipe(sourcemaps.write(paths.maps))
	    .pipe(size())
	    .pipe(gulp.dest(paths.styles.dest))
	    .pipe(gulp.dest(paths.styles.sitedest));
});


// WATCH TASK
gulp.task('watch', ['browserify-watch'], function() {
	gulp.watch(paths.scripts.files, ['lint'])
		.on('change', function(e) {
			F._logger(e);
		});
	gulp.watch(paths.styles.files, ['styles'])
		.on('change', function(e) {
			F._logger(e);
		});
});
