var mysql = require('../mysql/connection'),
    query = "SELECT postId,title,type,uploadTime FROM post";
var getList = module.exports = function(req,res,next){
    mysql(function(connection){
        connection.query(query,function(err,rows,fields){
            if(err){
                res.send('fail');
                throw err;
            }else{
                res.send(rows);
            }
        });
    });
}