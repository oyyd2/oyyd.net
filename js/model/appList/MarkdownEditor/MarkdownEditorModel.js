var MarkdownEditorModel = Backbone.View.extend({
    savePostOnServer:function(data,success,fail){
        $.ajax({
            url:'/uploadPost',
            data:{
                title:data.title,
                text:data.text,
                type:data.type
            },
            type:'POST',
            dataType:'text'
        }).done(function(res){
                if(res=='success'){
                    if(success){
                        success(res);
                    }
                }else{
                    if(fail){
                        fail(res);
                    }
                }
            }).fail(function(){
                if(fail) fail('Request failed!');
            });
    }
});