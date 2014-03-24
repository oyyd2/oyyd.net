var server = require('http').createServer();

server.on('request',function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end('Server is on working.');
});

server.listen(2333);
console.log('Running on 2333');
