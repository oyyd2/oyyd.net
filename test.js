var d = require('domain').create();

d.on('error',function(err){
	console.log(err);
});

d.run(function(){
	throw new Error('myError.');
});