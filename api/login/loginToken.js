var token = null,
    clearTime = 60,
    loginToken = module.exports = function(loginToken){
        token = loginToken;
    },
    setClearToken = function(){
        var clearTimeId = arguments.callee.clearTimeId;
        if(clearTimeId){
            clearTimeout(clearTimeId);
        }
        arguments.callee.clearTimeId = setTimeout(function(){
            token = null;
        },clearTime*1000*60);
    };
loginToken.check = function(cookieToken){
    if(!!!token){
        return false;
    }else if(token!==cookieToken){
        return false;
    }else{
        return true;
    }
};
setClearToken.clearTimeId = null;
