var crypto = require('crypto'),
    loginToken = require('./loginToken');

var checkPassword = module.exports = function(req,res,next){
    var password = req.body.password;
    require('./../mysql/connection')(function(connection){
        connection.query('SELECT passwd FROM user WHERE name="holic"',function(err,rows,fields){
            if(err) throw err;
            if(rows[0].passwd == password){
                var token = generateToken();
                loginToken(token);
                res.send(token);
            }else{
                res.send('fail');
            }
        });
    });
},
    generateToken = function(){
        md5 = crypto.createHash('md5')
        md5.update('holic'+Math.ceil(Math.random()*10000));
        return md5.digest('hex');
    };