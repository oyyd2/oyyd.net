//Here MarkdownEditor must be appended firstly
//and then rendered. Otherwise, some problem
//comes to codemirror when use CodeMirror.fromTextArea().
var MarkdownEditor = Backbone.View.extend({
    configuration:{
        beforeUnloadTips:'离开后数据将会遗失。',
        toolList:{
            left:'25px',
            activeLeft:'-5px',
            duration:800,
            items:[
                {
                    class:'saveOnServer',
                    title:'保存到服务器',
                    iconClass:'profile'
                }
            ]
        }
    },
    className:'MarkdownEditor',
    cm:null,
    $preview:null,
    languageOverrides:{
        js: 'javascript',
        html: 'xml'
    },
    events:{
        'mouseenter .markdownToolList':'toggleToolList',
        'mouseleave .markdownToolList':'toggleToolList',
        'click .saveOnServer':'showModal',
        'mouseenter .itemCtr>.icon':'showTooltip',
        'click .submitPost':'saveOnServer'
    },
    initialize:function(options){
        this.editorModel = options.model;
        console.log(this.unescapeHtml($('template.toolItem').html()));
        this.tooltipTemp = _.template(this.unescapeHtml($('template.toolItem').html()));//Written here because
                                                                                        // the unescapeHtml function is
                                                                                        // a local function.
    },
    render:function(){
        this.$el.html(this.template());
        this.renderTools();
        this.initEditor();
    },
    renderTools:function(){
        var items = this.configuration.toolList.items,
            item = null,
            $item = null,
            $tooltip = null
        for(var index in items){
            item = items[index];
            $item = $(this.tooltipTemp({iconClass:item.iconClass,meanClass:item.class,content:item.title}));
            $item.tooltip();
            this.$('.toolListPanel').append($item);
        }
    },
    initEditor:function(){
        this.$preview = this.$('.markdownContent');
        this.initMarked();
        this.initCM();
        this.initHeight();
//        this.initUnloadTips();
    },
    initHeight:function(){
        var that = this,
            resizeHandle = function(){
                that.$el.css('height',$(window).height());
                that.getCM().setSize('100%','100%');
            }
        resizeHandle();
        $(window).resize(function(){
            resizeHandle();
        });
    },
    initMarked:function(){
        var languageOverrides = this.languageOverrides;
        marked.setOptions({
            highlight: function(code, lang){
                if(languageOverrides[lang]) lang = languageOverrides[lang];
                return hljs.getLanguage(lang) ? hljs.highlight(lang, code).value : code;//TODO: here can be improved
            }
        });
    },
    initCM:function(){
        var cm = null,
            that = this;
        cm = CodeMirror(this.$('.markdownTextarea')[0], {
            mode:'markdown',
            lineNumbers: true,
            lineWrapping: true
        });
        cm.on('change',function(obj,changeObj){
            that.updatePreview(obj.getValue());
        });
        this.cm = cm;
    },
    initAutoSave:function(){//TODO: need a better way to remember text.
        if(!this.cm){
            return ;
        }

        var time = 7*24*60*60*1000,
        cm = this.cm,
        saveToCookie = function(){
            console.log(document.cookie);
        },
        intervalId = setInterval(function(){
            saveToCookie();
        },5000);
    },
    initUnloadTips:function(){
        var tips = this.configuration.beforeUnloadTips;
        $(window).on('beforeunload',function(event){
            event.returnValue = tips;
            return tips;
        });
    },
    getCM:function(){
        if(this.cm){
            return this.cm;
        }else{
            alert('cm null');
        }
    },
    updatePreview:function(markdownText){
        this.$preview.html(marked(markdownText));
    },
    toggleToolList:function(){
        var $toolList = this.$('.toolListPanel'),
            duration = this.configuration.toolList.duration,
            left = ($toolList.hasClass('active'))?this.configuration.toolList.left:this.configuration.toolList.activeLeft;
        $toolList.toggleClass('active');
        $toolList.stop().animate({
            'left':left
        },duration);

    },
    saveOnServer:function(){
        this.hideWarningMes();
        try{
            var text = this.cm.getValue(),
                title = this.$('.title').val(),
                type = this.$('.postType').val(),
                warningMes = '',
                data = {
                    text:text,
                    title:title,
                    type:type
                },
                that = this;
            if(text.length<1){
                warningMes+='原文内容为空。 '
            }
            if(title.length<1){
                warningMes+='标题为空。 '
            }
            if(warningMes){
                this.showWarningMes(warningMes);
                return ;
            }
            this.disableSubmit();
            this.editorModel.savePostOnServer(data,function(){
                that.hideModal();
            },function(res){
                alert(res);
            });
            this.ableSubmit();
        }catch(e){
            throw e;
        }
    },
    showTooltip:function(event){
        var $item = $(event.currentTarget);
        $item.tooltip('show');
    },
    showModal:function(){
        this.$('.modal').modal();
    },
    hideModal:function(){
        this.$('.modal').modal('hide');
    },
    showWarningMes:function(mes){
        var $tipsRegion = this.$('.tipsRegion');
        $tipsRegion.removeClass('hide').html(mes);
    },
    hideWarningMes:function(){
        this.$('.tipsRegion').addClass('hide');
    },
    disableSubmit:function(){
        this.$('.submitPost').addClass('disabled');
    },
    ableSubmit:function(){
        this.$('.submitPost').removeClass('disabled');
    },
    unescapeHtml:function(htmlStr){
        var regexp = /&lt;/g;
        htmlStr = htmlStr.replace(regexp,'<');
        regexp = /&gt;/g;
        htmlStr = htmlStr.replace(regexp,'>');
        return htmlStr;
    },
    template: _.template($('template.markdownEditor').html())
});