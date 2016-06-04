module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
  	watch: {
  	  sass: {
  	    files: 'src/scss/**/*.scss',
  	    tasks: ['sass'],
  	    options: {
  	      interrupt: true,
  	    },
  	  },
  	},

    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'public/stylesheets/main.css': 'src/scss/main.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);

};