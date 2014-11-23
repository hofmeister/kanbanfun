module.exports = function (grunt) {
	var remapify = require('remapify')

	grunt.initConfig({

		browserify: {
			public: {
				src: ['src/browser/js/kanban.js'],
				dest: 'public/js/kanban.js',
				options: {
					browserifyOptions: {
						debug: true
					}
				}
			}
		},
		less: {
			public: {
				options: {
					paths: ["src/browser/less/"]
				},
				files: {
					"public/css/kanban.css": "src/browser/less/kanban.less"
				}
			}
		},
		watch: {
			src: {
				files: [
					'./src/browser/**/*.*'
				],
				tasks: [
					'browserify:public',
					'less:public'
				],
				options: {
					livereload: true,
					atBegin: true,
					spawn: false
				}
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('default', [
		'watch:src'
	]);

	grunt.registerTask('build', [
		'browserify:public',
		'less:public'
	]);
};
