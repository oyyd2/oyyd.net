var mysql = require('./../mysql/connection');

var uploadPost = module.exports = function(req,res,next){
    var content = mysql.escapeStr(req.body.text),
        title = mysql.escapeStr(req.body.title),
        type = mysql.escapeStr(req.body.type),
        date = mysql.getDateTime((new Date()).getTime()),
        length = content.length;
    console.log(date);
    if(length<1){
        res.send('fail:content null');
        return ;
    }else if(length>10000){
        res.send('fail:content too long.');
        return ;
    }
    mysql(function(connection){
        connection.query('INSERT INTO post(content,title,type,uploadTime) VALUES("'+content+'","'+title+'","'+type+'","'+date+'")',function(err,rows,fields){
            if(err){
                res.send('fail:insert error');
                throw err;
            }else{
                res.send('success');
            }
        });
    });
};