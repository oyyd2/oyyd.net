var LoginModel = Backbone.Model.extend({
    password:'',
    setPassword:function(password){
        this.password = password;
        return this;
    },
    submitPassword:function(isRemembered,callback){
        var that = this;
        $.ajax({
            url:'/login/submit',
            type:'POST',
            data:{
                password:that.password
            },
            dataType:'text'
        }).done(function(res){
                if(res==='fail'){
                    console.log('Wrong password');
                }else{
                    that.setLoginCookie(res,isRemembered);
                }
                callback(res);
            }).fail(function(){
                console.log('Request failed!');
            });
    },
    setLoginCookie:function(token,isRemembered){
        if(!isRemembered){
            document.cookie = 'token='+token+'; path=/';
            return;
        }
        var date = new Date();
        date.setTime(date.getTime()+60*24*60*1000);
        document.cookie = 'token='+token+'; expires='+date.toUTCString()+'; path=/';

    },
    unsetLoginCookie:function(){
        document.cookie = 'token' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    }
});