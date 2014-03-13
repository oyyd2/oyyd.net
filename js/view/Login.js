var Login = Backbone.View.extend({
    failedCount:0,
    punishTime:3*60*1000,
    events:{
        'click .loginBtn':'submitLogin'
    },
    initialize:function(options){
        this.loginModel = options.loginModel;
    },
    render:function(){
        this.$el.html(this.template());
    },
    submitLogin:function(){
        var password = this.$('.password').val(),
            that = this;
        this.loginModel.setPassword(password).submitPassword((that.$('.rememberPassword:checked').length>0)?true:false,
            function(res){
                if(res==='fail'){
                    that.judgeAttack();
                }else{
                    that.successHandle();
                }
            });
    },
    ableSubmit:function(){
        this.$('.loginBtn').removeClass('disabled');
    },
    unableSubmit:function(){
        this.$('.loginBtn').addClass('disabled');
    },
    judgeAttack:function(){
        var that = this;
        this.failedCount++;
        if(this.failedCount>3){
            this.unableSubmit();
            setTimeout(function(){
                that.ableSubmit();
            },this.punishTime);
        }
    },
    successHandle:function(){
        location.href = '/appList';
    },
    template: _.template($('template.login').html())
});