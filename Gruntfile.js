module.exports = function(grunt) {

	// LOAD IN ALL TASKS
	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt, { pattern: ['grunt-*'] });
	grunt.loadTasks('grunt/tasks');

	// INIT GRUNT CONFIG
	grunt.initConfig({

		// READ IN PACKAGE.JSON
		pkg: grunt.file.readJSON('package.json'),

		// BANNER
		banner: [
			'/*!',
			' * Project Name: <%= pkg.name %>',
			' * Author: <%= pkg.author %>',
			' */\n'
		].join('\n'),


		// #############################################################################
		// VARIABLES
		// #############################################################################
		
		dir: {
			'styles': {
				src: 		'src/scss',
				unprefixed: 'src/css',
				dist: 		'public/css'
			},
			'scripts': {
				src: 		'src/js',
				dist: 		'public/js'
			},
			'images': {
				src: 		'src/img',
				dist: 		'public/img'
			},
			'html': {
				src: 		'src/html',
				dist: 		'public'
			},
			'port': '4567'
		},



		// #############################################################################
		// STYLES
		// #############################################################################

		// COMPASS
		compass: {
			build: {
				options: {
					sourcemap: true,
					banner: '<%= banner %>',
					specify: '<%= dir.styles.src %>/bundle-noprefix.scss',
					sassDir: '<%= dir.styles.src %>',
					cssDir: '<%= dir.styles.unprefixed %>',
					environment: 'production',
					outputStyle: 'compressed'
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
		},



		// #############################################################################
		// SCRIPTS
		// #############################################################################

		// CONCAT
		concat: {
			dist: {
				src: [
					'<%= dir.scripts.src %>/app.js',
					'<%= dir.scripts.src %>/**/*.js'
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
			},
			vendor: { // 3rd party scripts
				files: [{
					src: '<%= dir.scripts.src %>/**/*.js',
					dest: '<%= dir.scripts.src %>'
				}]
			}
		},


		// #############################################################################
		// HTML
		// #############################################################################

		rsync: {
			options: {
				args: ['--delete'],
				exclude: ['.git*'],
				recursive: true
			},
			html: {
				options: {
					src: '<%= dir.html.src %>/**',
					dest: '<%= dir.html.dist %>'
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
		// SERVER
		// #############################################################################

		connect: {
			server: {
				options: {
					port: '<%= dir.port %>',
					keepalive: true,
					base: '<%= dir.html.dist %>',
					open: {
						target: 'http://localhost:<%= dir.port %>'
					}
				}
			}
		},


		// #############################################################################
		// CONCURRENT
		// #############################################################################

		concurrent: {
			dev: ['server', 'watch'],
			all: ['style', 'script', 'content'],
			options: { logConcurrentOutput: true }
		},



		// #############################################################################
		// WATCH
		// #############################################################################
		
		watch: {
			options: {
				livereload: true
			},
			css: {
				files: '<%= dir.styles.src %>/**',
				tasks: ['compass', 'autoprefixer']
			},
			js: {
				files: '<%= dir.scripts.src %>/**',
				tasks: ['concat', 'uglify:scripts']
			},
			html: {
				files: '<%= dir.html.src %>/**',
				tasks: ['rsync:html']
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
	grunt.registerTask('default', ['concurrent:all']);
	grunt.registerTask('server', ['connect:server']);
	grunt.registerTask('style', ['compass:build', 'autoprefixer']);
	grunt.registerTask('script', ['concat', 'uglify:scripts']);
	grunt.registerTask('content', ['rsync:html', 'newer:imagemin']);
};
