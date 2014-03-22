var fs = require('fs');

var saveTempFile = module.exports = function(req,res,next){
	fs.writeFile('./api/uploadFile/tempFile.txt',req.body.data,function(err){
		if(err){
			res.send('Internal error');
			throw err;			
		}
		res.send('success');
	});
};