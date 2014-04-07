module.exports = function(grunt){
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        uglify:{            
            t1:{
                files:[                    
                    {
                        expand:true,
                        cwd:'js/',
                        src:['**/*.js','!**/lib/**/*.js'],
                        dest:'js/',
                        ext:'.js'
                    }
                ]
            }            
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default',['uglify']);
};