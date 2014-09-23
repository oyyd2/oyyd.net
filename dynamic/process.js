var express = require('express'),
    http = require('http'),
    lessMiddleware = require('less-middleware');

var app = express();

// Configuration
app.engine('jade',require('jade').__express);
app.use(lessMiddleware(__dirname+'/less'));
app.use(express.static(__dirname+'/less'));

// Include router.
var pixiv = require('./route/pixiv');
app.use('/pixiv',pixiv);

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