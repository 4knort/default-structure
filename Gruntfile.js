module.exports = function(grunt){
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({

    //компилятор лесс
    less: {
      style: {
        files: {
          "build/css/style.css": "source/less/style.less"
        }
      }
    },

    // автопрефиксер
    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: "last 2 versions"})
        ]
      },
      style: {
        src: "build/css/*.css"
      }
    },

    // grunt-watch
    watch: {
      style: {
        files: ["source/less/**/*.less", "source/js/*.js"],
        tasks: ["less", "postcss", "cssmin", "concat", "uglify"],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },

    // combine-media-quaries
    cmq: {
      style: {
        files: {
          "build/css/style.css": ["build/css/style.css"]
        }
      }
    },

    // минификатор css
    cssmin: {
      style: {
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    //csscomb
    csscomb: {
      style: {
        expand: true,
        src: ["source/less/**/*.less"]
      }
    },

    // оптимизатор изображений
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png, jpg, gif, svg}"]
        }]
      }
    },

    // grunt-copy
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "img/**",
          ],
          dest: "build"
        }]
      }
    },

    // grunt-clean
    clean: {
      build: ["build"]
    },

    // склеивание js
    concat: {
      dist: {
        src: ["source/js/script.js"],
        dest: "build/js/script.js"
      }
    },

    //минификатор js
    uglify: {
      my_target: {
        files: {
          "build/js/script.min.js": ["build/js/script.js"]
        }
      }
    }, 

    // инклудер
    includereplace: {
    your_target: {
      src: '*.html',
      dest: 'build/',
      expand: true,
      cwd: 'source/'
    }
  }
  });
grunt.registerTask("build", [
    "clean",
    "copy",
    "includereplace",
    "csscomb",
    "less",
    "cmq",
    "postcss",
    "cssmin",
    "imagemin",
    "concat",
    "uglify"
  ]);
};