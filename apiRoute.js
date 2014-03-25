var apiRoute = module.exports = function(app){
    app.post('/login/submit',function(req,res,next){
        require('./api/login/checkPassword')(req,res,next);
    });
    // MarkdownEditor
    app.post('/uploadMDText',function(req,res,next){
        require('./api/uploadFile/uploadMDText')(req,res,next);
    });    
    app.post('/uploadPost',function(req,res,next){
        require('./api/uploadFile/uploadPost')(req,res,next);
    });
    app.post('/MarkdownEditor/saveTempFile',function(req,res,next){
        require('./api/uploadFile/saveTempFile')(req,res,next);
    });
    app.get('/MarkdownEditor/getLastFile',function(req,res,next){
        require('./api/uploadFile/getLastFile')(req,res,next);
    });
    // blog
    app.get('/blog/getList',function(req,res,next){
        require('./api/blog/getList')(req,res,next);
    });
    app.post('/blog/delete',function(req,res,next){
        require('./api/blog/deleteBlog')(req,res,next);
    });
    // todo
    app.get('/todo/getList',function(req,res,next){
        require('./api/todo/getTodos')(req,res,next);
    });
    app.get('/todo/addTodo',function(req,res,next){
        require('./api/todo/addTodo')(req,res,next);
    });
    app.get('/todo/checkoutTodo',function(req,res,next){
        require('./api/todo/checkoutTodo')(req,res,next);
    });
};