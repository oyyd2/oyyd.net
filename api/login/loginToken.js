var 
    filePath = 'token.txt',
    fs = require('fs'),
    clearTime = 60,
    loginToken = module.exports = function(loginToken){
        fs.writeFile(filePath,loginToken,function(err){
            if(err){
                throw err;
            }
        });
    },
    setClearToken = function(){
        var clearTimeId = arguments.callee.clearTimeId;
        if(clearTimeId){
            clearTimeout(clearTimeId);
        }
        arguments.callee.clearTimeId = setTimeout(function(){
            fs.rmdir(filePath,function(){

            });
        },clearTime*1000*60);
    };
loginToken.check = function(cookieToken,callback){
    fs.exists(filePath,function(exists){
        if(exists) {
            fs.readFile(filePath,{encoding:'utf8'},function(err,data){                
                console.log(data,'\n',cookieToken);
                if(data!==cookieToken){
                    callback(false);
                }else{
                    callback(true);
                }
            });            
        }else{
            callback(false);
        }
    });
    
};
setClearToken.clearTimeId = null;
