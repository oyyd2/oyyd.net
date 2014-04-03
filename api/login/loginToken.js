var client = require('redis').createClient('6379','127.0.0.1'),
    clearTime = 60,
    loginToken = module.exports = function(loginToken){        
        client.set('token',loginToken,function(err){
            if(err){
                console.log(err);
                throw err;
            }
            client.expire('token',clearTime*60,function(err){
                if(err){
                    console.log(err);
                    throw err;
                }
            });
        });
    };

client.on('error',function(err){
    console.log(err);
    throw err;
});

loginToken.check = function(cookieToken,callback){
    client.get('token',function(err,reply){
        if(err){
            console.log(err);
            throw err;
        }
        if(!reply || reply!== cookieToken){
            callback(false);
        }else{
            callback(true);
        }
    });
};
