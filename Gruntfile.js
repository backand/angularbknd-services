module.exports = function(grunt) {




  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> v<%= pkg.version %> \n (c) Copyright 2014 Backand All rights reserved. https://backand.com \n License: MIT\n */\n'
      },
      js: {  
        src: '<%= pkg.name %>.debug.js',
        dest: '<%= pkg.name %>.min.js'
      }

    },

    
    concat: {
      options: {
        banner: '/*\n <%= pkg.name %> v<%= pkg.version %> \n (c) Copyright 2014 Backand All rights reserved. https://backand.com \n License: MIT\n */\n'       
      },
      
      js: {  
        options: {
          separator: ';'
        },   
        src: [ 
		      'auth.js',
          'data.js',
          'services.js'
		    ],
        dest:  '<%= pkg.name %>.debug.js'
      }
    }

  });


  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');


  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify']);

};