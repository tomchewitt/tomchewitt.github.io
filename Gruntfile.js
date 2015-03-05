module.exports = function(grunt) {

	// LOAD IN ALL TASKS
	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt, { pattern: ['grunt-*'] });

	// INIT GRUNT CONFIG
	grunt.initConfig({

		// READ IN PACKAGE.JSON
		pkg: grunt.file.readJSON('package.json'),


		// #############################################################################
		// VARIABLES
		// #############################################################################
		
		dir: {
			'styles': {
				src: 		'src/scss',
				unprefixed: 'src/css',
				dist: 		'dist/css'
			},
			'scripts': {
				src: 		'src/js',
				dist: 		'dist/js'
			},
			'images': {
				src: 		'src/img',
				dist: 		'dist/img'
			}
		},


		// #############################################################################
		// STYLES
		// #############################################################################

		// COMPASS
		compass: {
			build: {
				options: {
					sourcemap: false,
					specify: '<%= dir.styles.src %>/bundle-noprefix.scss',
					sassDir: '<%= dir.styles.src %>',
					cssDir: '<%= dir.styles.unprefixed %>',
					environment: 'production',
					outputStyle: 'compressed'
				}
			},
			bootstrap: {
				options: {
					sourcemap: false,
					specify: 'src/scss/vendor/bootstrap/custom-bootstrap.scss',
					sassDir: 'src/scss/vendor/bootstrap/',
					cssDir: 'src/scss/vendor/bootstrap/custom/css/',
					environment: 'production',
					outputStyle: 'expanded'
				}
			}
		},

		// AUTOPREFIXER
		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 9', 'ios 6', 'android 4'],
				map: true
			},
			files: {
				flatten: true,
				src: '<%= dir.styles.unprefixed %>/bundle-noprefix.css',
				dest: '<%= dir.styles.dist %>/bundle.css'
			},
			bootstrap: {
				flatten: true,
				src: 'src/scss/vendor/bootstrap/custom/css/custom-bootstrap.css',
				dest: 'src/scss/vendor/bootstrap/custom/scss/custom-bootstrap-prefixed.css'
			}
		},

		// CHANGE CUSTOM BOOTSTRAP CSS EXTENSION
		copy: {
			getSCSSFromCSS: {
				files: [{
					expand: true,
					cwd: 'src/scss/vendor/bootstrap/custom/scss/',
			        src: ['**/*.css'],
			        dest: 'src/scss/vendor/bootstrap/custom/scss/',
					rename: function(dest, src) {
						return dest + src.replace(/\.css$/, ".scss");
					}
				}]
			}
		},


		// #############################################################################
		// SCRIPTS
		// #############################################################################

		// CONCAT
		concat: {
			dist: {
				src: [
					'<%= dir.scripts.src %>/bootstrap/bootstrap.min.js'
					],
				dest: '<%= dir.scripts.dist %>/bundle.js'
			}
		},

		// UGLIFY
		uglify: {
			scripts: { // our scripts
				files: [{
					src: '<%= dir.scripts.dist %>/bundle.js',
					dest: '<%= dir.scripts.dist %>/bundle.min.js'
				}],
				options: {
					banner: '<%= banner %>',
				}
			}
		},


		// #############################################################################
		// IMAGES
		// #############################################################################

		imagemin: {
			src: {
				options: {
					optimizationLevel: 7,
					progressive: true,
					interlaced: true
				},
				files: [{
					expand: true,
					cwd: '<%= dir.images.src %>',
					src: '**/*.{png,jpg,gif}',
					dest: '<%= dir.images.dist %>'
				}]
			}
		},


		// #############################################################################
		// WATCH
		// #############################################################################
		
		watch: {
			css: {
				files: '<%= dir.styles.src %>/**',
				tasks: ['compass:build', 'autoprefixer:files']
			},
			js: {
				files: '<%= dir.scripts.src %>/**',
				tasks: ['concat', 'uglify:scripts']
			},
			images: {
				files: '<%= dir.images.src %>/**',
				tasks: ['newer:imagemin:src']
			}
		}
	});


	// #############################################################################
	// TASKS
	// #############################################################################
	grunt.registerTask('default', ['compass:build', 'autoprefixer', 'concat', 'uglify:scripts', 'newer:imagemin']);
	grunt.registerTask('style', ['compass:build', 'autoprefixer']);
	grunt.registerTask('vendorstyle', ['compass:bootstrap', 'autoprefixer:bootstrap', 'copy:getSCSSFromCSS']);
	grunt.registerTask('script', ['concat', 'uglify:scripts']);
	grunt.registerTask('image', ['newer:imagemin']);
};
