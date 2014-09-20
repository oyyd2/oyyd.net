var express = require('express'),
    http = require('http');

var app = express();

var httpServer = http.createServer(app);
var worker;

process.on('message',function(message,tcp){
  if(message=='server'){
    worker = tcp;
    worker.on('connection',function(socket){
      httpServer.emit('connection',socket);
    });
  }
});

process.on('uncaughtException',function(err){
  console.log(err);
  worker.close(function(){
    process.exit(1);
  });
});