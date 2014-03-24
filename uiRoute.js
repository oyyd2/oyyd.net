var uiRoute = module.exports = function(app){
//Login
    app.get('/login',function(req,res,next){
        res.render('login.jade');
    });
//    appList
    app.get('/appList',function(req,res,next){
        res.render('./appList/appList.jade');
    });
//    markdownEditor
    app.get('/appList/MarkdownEditor',function(req,res,next){
        res.render('./appList/MarkdownEditor/MarkdownEditor.jade');
    });
    app.get('/appList/Try-backbone-todolist-in-angular',function(req,res,next){
        res.render('./appList/angular/TodoList.jade');
    });
//    blog
    app.get('/appList/blog',function(req,res,next){
        res.render('./appList/blog/BlogList.jade');
    });
    app.get('/appList/blog/:id',function(req,res,next){
        require('./api/blog/blogDetail')(req,res,next);
    });
//    TodoList
    app.get('/appList/TodoList',function(req,res,next){
        res.render('./appList/todo/todoList.jade');
    });
//  Bug test page
    app.get('/',function(req,res,next){
        res.render('./snippet/testbug.jade');
    });
};