var cpus = require('os').cpus(),
	cp = require('child_process'),
	server = require('net').createServer();

server.listen(1337);
console.log('Master server running on 1337');

var workers = {},
	createWorker = function(){
		var worker = cp.fork(__dirname+'/worker.js');
		worker.on('message',function(mes){
			if(mes.act==='suicide'){
				createWorker();
			}
		});
		worker.on('exit',function(){
			console.log('Worker '+worker.pid+' exited.');
			delete workers[worker.pid];
		});
		worker.send('server',server);
		workers[worker.pid] = worker;
		console.log('Create worker: '+worker.pid);
	};

for(var i=0;i<cpus.length;i++){
	createWorker();
}

process.on('exit',function(){
	console.log('Master process exit.');
	for(var pid in workers){
		workers[pid].kill();
	}
});