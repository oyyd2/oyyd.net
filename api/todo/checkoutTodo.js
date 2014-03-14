var mysql = require('../mysql/connection');
var checkoutTodo = module.exports = function(req,res,next){
	var todoId = mysql.escapeStr(req.query.todoId),
		query = "UPDATE todo SET finished = '1' WHERE id='"+todoId+"'";
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