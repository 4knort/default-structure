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
    // grunt-watch
    watch: {
      style: {
        files: ["source/*.html", "source/less/**/*.less", "source/js/*.js"],
        tasks: ["includereplace", "less", "postcss", "cssmin", "concat", "uglify"],
        options: {
          spawn: false,
          livereload: true
        }
      },
      images: {
        files: ["source/img/**/*.png", "source/img/**/*.svg", "source/img/**"],
        tasks: ["clean", "sprite", "copy", "svgmin", "svgstore"],
      }
    },

    //jade compiler
     pug: {
        compile: {
            options: {
                client: false,
                pretty: true,
                data: {
                    debug: false
                }
            },
            files: [
            {
                'build/index.html': ['source/index.jade']
            },
            {
                src: "*.jade",
                dest: "build/",
                cwd: 'source/templates/',
                expand: true,
                ext: ".html"
            } ]
        }
    },


    //svg-sprite
    svgstore: {
      options: {
        includeTitleElement: false,
        svg: {
          style: 'display:none',
        },
        cleanup: [
          'fill',
        ],
      },
      default : {
        files: {
          'build/img/sprite.svg': ['build/img/sprites-svg/*.svg'],
        },
      },
    },

    //svg minifier
    svgmin: {
        options: {
            plugins: [
                {
                    removeViewBox: false
                }, {
                    removeUselessStrokeAndFill: false
                },
            ]
        },
        dist: {
            files: [{
              expand: true,
              src: ["build/img/**/*.svg"]
            }]
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

    //sprites
    sprite:{
      all: {
        src: 'source/img/sprites/*.png',
        dest: 'source/img/sprites/sprites.png',
        destCss: 'source/less/sprites.less',
        padding: 10
      },
    },
    // grunt-copy
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "img/**.png", "img/**.jpg", "img/**.svg", "img/**.gif", "img/sprites/sprites.png", "fonts/**", "video/**"
          ],
          dest: "build"
        }]
      }
    },

    // grunt-clean
    clean: {
      build: ["build", "source/img/sprites/sprites.png", "source/img/sprites/sprites.css"]
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
  },

    //connect for grunt-watch
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'build/',
          hostname: '0.0.0.0',
          protocol: 'http',
          livereload: true,
          open: true,
        }
      }
    }

  });

grunt.registerTask("build", [
    "clean",
    "sprite",
    "copy",
    "includereplace",
    "csscomb",
    "less",
    "cmq",
    "postcss",
    "cssmin",
    "imagemin",
    "svgmin",
    "svgstore",
    "concat",
    "uglify"
  ]);
grunt.registerTask("server", [
    "connect",
    "watch"
  ]);
};
