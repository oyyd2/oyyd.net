var d = require('domain').create();

d.on('error',function(err){
	console.log('Error occurs.');
});

d.run(function(){
	throw new Error('myError.');
});