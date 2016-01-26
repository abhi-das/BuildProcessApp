/*
 Developer: Abhishek Das | INDIA
 Published Date: 27 Dec, 2015
 Linkedin: www.linkedin.com/in/zestyart
 Purpose: JS Build Process Logic and Initializer
*/
module.exports = function( grunt ){

	grunt.loadNpmTasks( "grunt-contrib-compass" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify:{
			my_target:{
				files: {
					'js/script.js' : ['components/*.js']
				}
			}
		}, //uglify

		compass: {
			dev: {
				options: {
					config: "config.rb"
				}
			}
		},

		watch: {
			scripts: {
				files: ["components/*.js"],
				tasks: ['uglify']
			}, //scripts
			sass: {

				files: [ "components/sass/*.scss"],
				tasks: [ "compass:dev" ]
			}
		}	//Watch
	}); //InitConfig

	grunt.registerTask( "default", "watch" );

} //Export