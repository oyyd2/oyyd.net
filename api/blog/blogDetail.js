var mysql = require('../mysql/connection');
var blogDetail = module.exports = function(req,res,next){
    var postId = mysql.escapeStr(req.params.id),
        query = "SELECT * FROM post WHERE postId='"+postId+"'";
    mysql(function(connection){
        connection.query(query,function(err,rows){
            if(err){
                res.send('Internal error');
                throw err;
            }else{
                if(rows[0]){
                    console.log(rows[0]['title']);
                    res.render('appList/blog/BlogDetail.jade',{blog:rows[0]},function(err,html){
                        res.send(html);
                    });
                }else{
                    res.render('common/error/404.jade');
                }
            }
        });
    });
}