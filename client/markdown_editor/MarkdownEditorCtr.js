var MarkdownEditorCtr = Backbone.View.extend({
    initialize:function(){
        var markdownEditorModel = new MarkdownEditorModel(),
            markdownEditor = new MarkdownEditor({model:markdownEditorModel});

        $('body').append(markdownEditor.$el);//Here MarkdownEditor must be appended firstly
        markdownEditor.render();             //and then rendered. Or some problem comes to codemirror.
    }
});

new MarkdownEditorCtr();