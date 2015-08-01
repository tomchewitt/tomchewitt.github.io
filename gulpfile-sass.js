// LOAD IN REQS
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	watch = require('gulp-watch'),
	size = require('gulp-size'),
	colors = require('colors/safe'),
	dateformat = require('dateformat'),
	sourcemaps = require('gulp-sourcemaps');


// PATHS
var paths = {
	maps: '../maps',
    styles: {
        src: '_scss',
        files: '_scss/**/*.scss',
        dest: 'asset/css'
    },
    scripts: {
    	src: '',
    	files: '',
    	dest: ''
    },
    templates: {
    	src: '',
    	files: '',
    	dest: ''
    }
}

// ERROR LOGGING
var displayError = function(error) {
    var errorString = '[' + colors.red.bold(error.plugin) + ']';
    errorString += ' ' + colors.grey.italic(error.message.replace("\n",''));

    // If the error contains the filename or line number add it to the string
    if (error.fileName) {
        errorString += ' in ' + error.fileName;
    }
    if (error.lineNumber) {
        errorString += ' on line ' + error.lineNumber;
    }
    console.error(errorString);
}

// STYLE TASK
gulp.task('styles', function (){
    gulp.src(paths.styles.files)
    	.pipe(sourcemaps.init())
		    .pipe(sass({
		        outputStyle: 'compressed',
		        sourceMap: 'sass',
		        includePaths : [paths.styles.src]
		    }))
		    .on('error', function(err){ displayError(err)})
		    .pipe(prefix('last 2 version', 'safari 5', 'ie 9', 'ios 6', 'android 4'))
		.pipe(sourcemaps.write(paths.maps))
	    .pipe(size())
	    .pipe(gulp.dest(paths.styles.dest))
});


// WATCH TASK
gulp.task('watch', function() {
	 gulp.watch(paths.styles.files, ['styles'])
		.on('change', function(e) {
			var now = new Date();
		    console.log('[' + colors.grey(dateformat(now, 'HH:MM:ss')) + '] ' + colors.cyan.italic(e.path.split(__dirname + '/')[1]) + ' : ' + e.type);
		});
});
