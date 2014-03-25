var mysql = require('../mysql/connection'),
    loginToken = require('../login/loginToken');

var deleteBlog = module.exports = function(req,res,next){
    var token = req.body.token,
        postId = mysql.escapeStr(req.body.postId);
    
    loginToken.check(token,function(pass){
        if(!pass){
            res.send('请先登录');
            return;     
        }
        var query = "DELETE FROM post WHERE postId = '"+postId+"'";
        mysql(function(connection){
            connection.query(query,function(err,rows){
                if(err){
                    res.send('500');
                    throw err;
                }else{
                    res.send('success');
                }
            });
        });
    });     
};