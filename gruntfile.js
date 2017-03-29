
module.exports = function(grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        // store some paths
        cssDir: 'css',
        scssDir: 'css/src',
        jsDir: 'js',
        jsLibDir: 'js/lib',
        jsSrcDir: 'js/src',


        // watch for changes and trigger compass, jshint, uglify and livereload
        watch: {
            js: {
                files: ['<%= jsLibDir %>/**/*.js', '<%= jsSrcDir %>/*.js'],
                tasks: ['uglify'],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: '<%= scssDir %>/*.scss',
                tasks: ['sass', 'autoprefixer'],
                options: {
                    livereload: true,
                },
            }
        },


        // we use the Sass
        sass: {
            dist: {
                options: {
                    // nested, compact, compressed, expanded
                    style: 'compressed'
                },
                files: {
                    '<%= scssDir %>/main-unprefixed.css': '<%= scssDir %>/main.scss'
                }
            }
        },


        // uglify to concat & minify
        uglify: {
            js: {
                files: {
                    '<%= jsDir %>/main.js': [
                        '<%= jsLibDir %>/jquery.min.js',
                        '<%= jsLibDir %>/accrue/jquery.accrue.js',
                        '<%= jsSrcDir %>/*.js',
                    ],
                    '<%= jsDir %>/head.js': [
                        '<%= jsLibDir %>/shiv/dist/html5shiv.js',
                        '<%= jsLibDir %>/respond/dest/respond.min.js',
                    ],
                }
            }
        },


        // auto-prefix our css3 properties.
        autoprefixer: {
            files: {
                dest: '<%= cssDir %>/main.css',
                src: '<%= scssDir %>/main-unprefixed.css'
            }
        },


    });


    // register task
    grunt.registerTask('default', ['watch']);
};