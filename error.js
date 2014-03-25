var fs = require('fs');
var error = module.exports = function(err){
    var errInfo = (new Date()).toString();
    errInfo+='\n'+err.toString();
    // errInfo+='\ncode '+err.code+'\n';
    // errInfo+='errno '+err.errno+'\n\n';

	fs.appendFile('./logs/errorLog/errorLog.txt',errInfo+'\n',function(err){
		if (err) {			
			throw(err);
		}
	});
	// console.log(err);
};