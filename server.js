var fork = require('child_process').fork,
    // cpus = require('os').cpus().length,    
    cpus = 1,
    server = require('net').createServer(),
    workers = {},
    error = require('./error.js');

var createWorker = function(){
    var worker = fork(__dirname+'/worker.js');
    // worker.on('error',function(err){
    //     console.log(err);
    //     error(err);
    // });    
    worker.on('exit',function(){
        console.log('Worker '+worker.pid+' exited.');
        delete workers[worker.pid];
        createWorker();
    });

    workers[worker.pid] = worker;
    console.log('Create worker '+worker.pid);    
};

for(var i=0;i<cpus;i++){
    createWorker();
}

server.listen(2333,'localhost',function(){
    console.log('Master server is running on 2333.');    
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