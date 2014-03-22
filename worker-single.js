//dependency
var express = require('express'),
    lessMiddleware = require('less-middleware'),
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
app.use(function(err,req,res,next){
	error(err,req,res,next);
});

app.use('/static',express.static(__dirname+'/static'));
app.use('/js',express.static(__dirname+'/js'));

//Init route
uiRoute(app);
apiRoute(app);

app.listen(2333);
console.log('Server runs at 2333 port');