//dependency
var express = require('express'),
    lessMiddleware = require('less-middleware'),
    http = require('http'),
    app = express(),
    uiRoute = require('./uiRoute'),
    apiRoute = require('./apiRoute'),
    error = require('./error');    

//configuration
app.engine('jade',require('jade').__express);
app.set('views','views/');
// app.use(express.logger());
app.use(lessMiddleware({
    dest:__dirname+'/static/css',
    src:__dirname+'/less',
    prefix:'/static/css',
    compress:true
}));
app.use(express.bodyParser());

app.use('/static',express.static(__dirname+'/static'));
app.use('/js',express.static(__dirname+'/js'));

//Init route
uiRoute(app);
apiRoute(app);

var httpServer = http.createServer(app);
var worker;

process.on('message',function(m,tcp){
	if(m==='server'){
		worker = tcp;                
        worker.on('connection',function(socket){
            console.log(process.pid+' connected.');
            httpServer.emit('connection',socket);
        });
	}
});
process.on('uncaughtException',function(err){
    error(err);
	worker.close(function(){
		process.exit(1);
	});
});