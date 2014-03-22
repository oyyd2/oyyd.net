var fork = require('child_process').fork,
    cpus = require('os').cpus().length,
    server = require('net').createServer(),
    workers = {};

server.listen(2333);
console.log('Master server is running on 2333.');

var createWorker = function(){
    var worker = fork(__dirname+'/worker.js');
    worker.on('exit',function(){
        console.log('Worker '+worker.pid+' exited.');
        delete workers[worker.pid];
        createWorker();
    });

    worker.send('server',server);
    workers[worker.pid] = worker;
    console.log('Create worker '+worker.pid);    
};

for(var i=0;i<cpus;i++){
    createWorker();
}

process.on('exit',function(){
    for(var pid in workers){
        workers[pid].kill();
    }
});