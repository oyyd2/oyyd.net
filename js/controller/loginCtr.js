var LoginCtr = Backbone.View.extend({
    initialize:function(){
        var loginModel = new LoginModel();
        var login = new Login({loginModel:loginModel});
        login.render();
        $('body').append(login.$el);
    }
});

var loginCtr = new LoginCtr();
