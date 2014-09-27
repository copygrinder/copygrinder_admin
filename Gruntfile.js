'use strict';

module.exports = function (grunt) {

  require('time-grunt')(grunt);

  require('jit-grunt')(grunt, {
    bower: 'grunt-bower-task',
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    instrument: 'grunt-istanbul',
    makeReport: 'grunt-istanbul',
    protractor: 'grunt-protractor-runner',
    htmllint: 'grunt-html',
    closureCompiler: 'grunt-closure-tools',
    replace: 'grunt-text-replace'
  });

  var protractorBreaksBuild = grunt.option('protractorBreaksBuild') || false;

  grunt.initConfig({

    yeoman: {
      app: 'app',
      dist: 'dist',
      mainTmp: '.tmp/main',
      closureTmp: '.tmp/main/closure',
      covTmp: '.tmp/cov',
      covTmpInst: '.tmp/inst',
      bowerComponents: 'components'
    },

    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/**/*.js'],
        tasks: ['newer:jshint:all', 'newer:copy:scripts', 'closure'],
        options: {
          livereload: true
        }
      },
      jsTest: {
        files: ['test/**/*.js'],
        tasks: ['newer:jshint:test', 'runProtractor']
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        options: {
          reload: true
        },
        tasks: ['prepare']
      },
      less: {
        files: ['app/styles/**/*.less'],
        tasks: ['less', 'lesslint', 'newer:copy:styles', 'autoprefixer']
      },
      angular: {
        files: ['<%= yeoman.app %>/views/**'],
        tasks: ['newer:htmllint', 'ngtemplates']
      },
      index: {
        files: ['<%= yeoman.app %>/index.html'],
        tasks: ['newer:htmllint', 'newer:copy:tmp', 'wiredep', 'includeSource']
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0',
        livereload: 35729
      },
      livereload: {
        options: {
          base: [
            '<%= yeoman.mainTmp %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '<%= yeoman.mainTmp %>',
            'test'
          ],
          livereload: false
        }
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>',
          livereload: false
        }
      },
      cov: {
        options: {
          base: '<%= yeoman.covTmp %>',
          livereload: false
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/**/*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/**/*.js']
      }
    },

    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: [
              '<%= yeoman.dist %>/*',
              '!<%= yeoman.dist %>/.git*'
            ]
          }
        ]
      },
      tmp: '.tmp',
      reports: [
        '.tmp/reports'
      ]
    },

    autoprefixer: {
      options: {
        browsers: ['last 1 version'],
        map: true
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.mainTmp %>/styles/',
            src: '**/*.css',
            dest: '<%= yeoman.mainTmp %>/styles/'
          }
        ]
      }
    },

    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/**/*.js',
            '<%= yeoman.dist %>/styles/**/*.css',
            '<%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },

    useminPrepare: {
      html: '<%= yeoman.mainTmp %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },

    usemin: {
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/styles/**/*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images'],
        dest: '<%= yeoman.dist %>'
      }
    },

    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>/images',
            src: '**/*.{png,jpg,jpeg,gif}',
            dest: '<%= yeoman.dist %>/images'
          }
        ],
        options: {
          cache: false
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: false
        },
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.dist %>',
            src: ['*.html', 'views/**/*.html'],
            dest: '<%= yeoman.dist %>'
          }
        ]
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: '0'
      }
    },

    ngAnnotate: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/concat/scripts',
            src: ['scripts.js'],
            dest: '.tmp/concat/scripts'
          }
        ]
      }
    },

    copy: {
      tmp: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.mainTmp %>',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              '*.html',
              'images/**/**',
              'fonts/*',
              '<%= yeoman.bowerComponents %>/**',
              'third_party_scripts/**'
            ]
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.mainTmp %>',
            dest: '<%= yeoman.dist %>',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              '*.html',
              'images/**/*.{webp}',
              'fonts/*'
            ]
          },
          {
            expand: true,
            cwd: '<%= yeoman.mainTmp %>/images',
            dest: '<%= yeoman.dist %>/images',
            src: ['generated/*']
          }
        ]
      },
      scripts: {
        expand: true,
        cwd: '<%= yeoman.app %>/scripts',
        dest: '<%= yeoman.mainTmp %>/scripts/',
        src: '**/*.js'
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '<%= yeoman.mainTmp %>/styles/',
        src: '**/*.{css,less}'
      },
      cov1: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.mainTmp %>',
            dest: '<%= yeoman.covTmp %>',
            src: [
              '**'
            ]
          }
        ]
      },
      cov2: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.covTmpInst %>/<%= yeoman.mainTmp %>',
            dest: '<%= yeoman.covTmp %>',
            src: [
              '**'
            ]
          }
        ]
      }
    },

    bower: {
      install: {
        options: {
          install: true,
          verbose: true,
          cleanTargetDir: false,
          cleanBowerDir: false,
          copy: false,
          targetDir: '<%= yeoman.app %>/<%= yeoman.bowerComponents %>',
          bowerOptions: {}
        }
      }
    },

    less: {
      development: {
        options: {
          paths: [ '<%= yeoman.app %>/<%= yeoman.bowerComponents %>' ],
          sourceMap: true,
          sourceMapBasepath: 'app/styles',
          sourceMapURL: 'less.css.map'
        },
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.mainTmp %>',
            ext: '.css',
            src: [
              'styles/**/*.less'
            ]
          }
        ]
      }
    },

    lesslint: {
      options: {
        csslint: {
          csslintrc: '.csslintrc'
        }
      },
      src: ['<%= yeoman.app %>/styles/**.less']
    },

    ngtemplates: {
      app: {
        cwd: '<%= yeoman.app %>',
        src: 'views/**/**.html',
        dest: '<%= yeoman.mainTmp %>/scripts/templates.js',
        options: {
          htmlmin: { collapseWhitespace: true, collapseBooleanAttributes: true },
          module: 'copygrinderHome'
        }
      }
    },

    includeSource: {
      options: {
        basePath: '<%= yeoman.mainTmp %>'
      },
      app: {
        files: {
          '<%= yeoman.mainTmp %>/index.html': '<%= yeoman.mainTmp %>/index.html'
        }
      }
    },

    instrument: {
      files: '<%= yeoman.mainTmp %>/scripts/**/**.js',
      options: {
        lazy: false,
        basePath: '<%= yeoman.covTmpInst %>'
      }
    },

    makeReport: {
      src: '.tmp/reports/coverage.json',
      options: {
        type: 'lcov',
        dir: '.tmp/reports',
        print: 'summary'
      }
    },

    protractor: {
      main: {
        options: {
          configFile: 'test/protractorConf.js', // Target-specific config file
          keepAlive: !protractorBreaksBuild,
          args: {} // Target-specific arguments
        }
      }
    },

    htmllint: {
      all: {
        files: [
          {
            expand: false,
            src: ['<%= yeoman.app %>/**/*.html']
          }
        ]
      },
      options: {
        ignore: [
          'XHTML element “head” is missing a required instance of child element “title”.',
          'Start tag seen without seeing a doctype first. Expected “<!DOCTYPE html>”.'
        ]
      }
    },

    accessibility: {
      options: {
        accessibilityLevel: 'WCAG2A',
        domElement: true,
        verbose: false,
        ignore: [
          'WCAG2A.Principle2.Guideline2_4.2_4_2.H25.1.NoTitleEl',
          'WCAG2A.Principle3.Guideline3_1.3_1_1.H57.2',
          'WCAG2A.Principle2.Guideline2_4.2_4_1.G1,G123,G124.NoSuchID'
        ]
      },
      test: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>/',
            src: ['views/**/*.html'],
            dest: '.tmp/accessibility',
            ext: '-report.txt'
          }
        ]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.mainTmp %>/index.html'],
        ignorePath: /\.\.\/\.\.\/app\//
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      prepare1: [
        'htmllint',
        'jshint',
        'lesslint',
        'prepare2'
      ]
    },

    closureCompiler: {

      options: {
        compilerFile: '<%= yeoman.app %>/components/closure-compiler/compiler.jar',
        //checkModified: true,

        compilerOpts: {
          'compilation_level': 'ADVANCED_OPTIMIZATIONS',
          externs: ['<%= yeoman.app %>/components/angular-extern/index.js'],
          'warning_level': 'verbose',
          'summary_detail_level': 3,
          'output_wrapper': '"(function(){%output%}).call(this);\n\n//# sourceMappingURL=closure.js.map"',
          'create_source_map': '<%= yeoman.closureTmp %>/closure.js.map',
          'angular_pass': null,
          'generate_exports': null,
          'debug': null,
          'formatting':'pretty_print'
        },
        execOpts: {
          maxBuffer: 999999 * 1024
        }
      },

      compile: {
        src: ['<%= yeoman.app %>/components/closure-base/index.js', '<%= yeoman.app %>/scripts/**/*.js'],
        dest: '<%= yeoman.closureTmp %>/closure.js'
      }
    },

    replace: {
      fixSourceMap: {
        src: ['<%= yeoman.closureTmp %>/closure.js.map'],
        overwrite: true,
        replacements: [
          {
            from: /app\/scripts/g,
            to: '../scripts'
          }
        ]
      }
    }

  });


  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['prepare', 'build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'prepare',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('closure', [
    'closureCompiler',
    'replace:fixSourceMap'
  ]);

  grunt.registerTask('test', [
    'cov',
    'runProtractor'
  ]);

  grunt.registerTask('runProtractor', [
    'clean:reports',
    'protractor:main',
    'makeReport'
  ]);

  grunt.registerTask('testLoop', [
    'test',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'imagemin',
    'concat',
    'copy:dist',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('prepare', [
    'concurrent:prepare1'
  ]);

  grunt.registerTask('prepare2', [
    'clean:tmp',
    'copy:tmp',
    'copy:styles',
    'copy:scripts',
    'wiredep',
    'less',
    'autoprefixer',
    'ngtemplates',
    'includeSource',
    'closure'
  ]);

  grunt.registerTask('cov', [
    'prepare',
    'instrument',
    'copy:cov1',
    'copy:cov2',
    'connect:cov'
  ]);

  grunt.registerTask('default', [
    'bower:install',
    'prepare',
    'build'
  ]);
};