var PORT = 3000;
var fork = require('child_process').fork,
    cpus = require('os').cpus().length,
    server = require('net').createServer(),
    workers = {};

function createWorker(){
  var worker = fork(__dirname+'/process.js');
  worker.on('exit',function(){
    delete workers[worker.pid];
    createWorker();
  });
  workers[worker.pid] = worker;  
}

for(var i=0;i<cpus;i++){
  createWorker();
}

server.listen(PORT,function(){
  for(var pid in workers){
    workers[pid].send('server',server);
  }
  server.close();
});

process.on('exit',function(){
  for(var pid in workers){
    workers[pid].kill();
  }
});

console.log('listen on '+PORT);