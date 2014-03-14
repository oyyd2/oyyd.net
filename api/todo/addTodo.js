var mysql = require('../mysql/connection'),
	loginToken = require('../login/loginToken');
var addTodo = module.exports = function(req,res,next){
	var content = mysql.escapeStr(req.query.content),
		token = req.query.token;	
	if(content===''){
		res.send('Null Content');
		return;
	}	
	if(!loginToken.check(token)){
		res.send('请先登录');
		return;		
	}
	var query = "INSERT INTO todo(content,uploadTime) VALUES('"+content+"','"+mysql.getCurrentDateTime()+"')";
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
};