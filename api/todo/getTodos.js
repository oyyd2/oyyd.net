var mysql = require('../mysql/connection.js'),
	query = "SELECT id,content,uploadTime,finished FROM todo ORDER BY finished ASC,uploadTime DESC";
var renderTodo = module.exports = function(req,res,next){
	mysql(function(connection){
		connection.query(query,function(err,rows){
			if(err){
				res.send('Internal error');
				throw err;
			}else{
				res.send(rows);				
			}
		});
	});
};