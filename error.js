var fs = require('fs');
var error = module.exports = function(err,req,res,next){
	fs.appendFile('./logs/errorLog/errorLog.txt',err,function(err){
		if (err) {			
			throw(err);
		}
	});
	// console.log(err);
};