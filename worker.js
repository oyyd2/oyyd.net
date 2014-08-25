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

//Use and config less-middleware.
// app.use(lessMiddleware({
//     dest:__dirname+'/static/css',
//     src:__dirname+'/less',
//     prefix:'/static/css',
//     compress:true
// }));
//Import and config less module.
app.use('/static/css',lessMiddleware(__dirname + '/less',{
    dest:__dirname+'/static/css'
}));

//Express config.
app.use(express.json());
app.use(express.urlencoded());

app.use('/static',express.static(__dirname+'/static'));
app.use('/client',express.static(__dirname+'/client'));
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
    error(err.stack);
    worker.close(function(){
        console.log('tcp is closed.');
        process.exit(1);
    });
});