
var mysql = require('../../api/mysql/connection.js'),
	query = "SELECT id,content,uploadTime,finished FROM todo";
var renderTodo = module.exports = function(req,res,next){
	mysql(function(connection){
		connection.query(query,function(err,rows){
			if(err){
				res.render('./common/error/500.jade');
				throw err;
			}else{
				res.render('./appList/todo/todoList.jade',{todo:{todoList:rows}}); 
			}
		});
	});
};