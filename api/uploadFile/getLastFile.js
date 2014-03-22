var fs = require('fs');
var getLastFile = module.exports = function(req,res,next){
	fs.readFile('./api/uploadFile/tempFile.txt',function(err,data){
		if(err){
			res.send('error');
			throw err;
		}else{
			res.send(data);
		}
	});
};