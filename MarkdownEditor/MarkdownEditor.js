//Here MarkdownEditor must be appended firstly
//and then rendered. Otherwise, some problem
//comes to codemirror when use CodeMirror.fromTextArea().
var MarkdownEditor = Backbone.View.extend({
    CONTENT_REF:'MarkdownContent',
    AUTO_SAVING_INTERVAL:60*1000,
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
                },
                {
                    class:'saveOnLocal',
                    title:'浏览器本地保存',
                    iconClass:'document'  
                },
                {
                    class:'printView',
                    title:'打印预览',
                    iconClass:'print'  
                }
            ]
        }
    },
    className:'MarkdownEditor',
    cm:null,
    $preview:null,
    welcomContent:"#**MarkdownEditor**\r---\r**Note**:This application isn't my original application because my idea of imprement of the application is copied from some else(feel shamed that I can't find his web page now). Ofcourse I just used what he used and finished the rest work by myself.  \r\r这是一个简单的Markdown编辑器，用来为我自己的网站在发布blog或其他文本编辑内容时的使用。\r\r下面是几种常用的markdown格式:  \r\r* 常用字体样式  \r*斜体*，**加粗**,`底色`  \r\r* javascript代码（代码只支持javascript，html和markdown的高亮）  \r```javascript\rvar foo = function(){\r    alert('Hello world from oyyd');\r}\r```\r* 链接  \r[Build software better, together.][github]\r\r[github]:https://github.com/\r\r* 图片  \r  ![github cat](/static/pic/MarkdownEditor/github.jpg)\r\r",
    languageOverrides:{
        js: 'javascript',
        html: 'xml',
        'c++':'cpp'
    },
    events:{
        'mouseenter .markdownToolList':'focusToolList',
        'mouseleave .markdownToolList':'blurToolList',
        'click .saveOnServer':'showModal',
        'mouseenter .itemCtr>.icon':'showTooltip',
        'click .submitPost':'saveOnServer',
        'click .saveOnLocal':'saveOnLocal',
        'click .printView':'showPrintingView'
    },
    initialize:function(options){
        this.editorModel = options.model;
        this.tooltipTemp = _.template(this.unescapeHtml($('template.toolItem').html()));//Written here because
                                                                                        // the unescapeHtml function is
                                                                                        // a local function.                                                                                            
    },
    isLocalStorageAvailable:function(){
        return ('localStorage' in window && typeof localStorage.setItem == 'function')?true:false;        
    },
    render:function(){
        this.$el.html(this.template());      
        if(this.isLocalStorageAvailable()){
            if(localStorage.getItem(this.CONTENT_REF)){
                this.lastFile = localStorage.getItem(this.CONTENT_REF);
            }            
        }        
        this.renderTools();                
        this.initEditor();                
        if(this.isLocalStorageAvailable()){
            this.initAutoLocalSaving();            
        }
    },    
    initAutoLocalSaving:function(){        
        var that = this;
        if(this.isLocalStorageAvailable()){
            setInterval(function(){
                console.log('Saved.');
                localStorage.setItem(that.CONTENT_REF,that.getCM().getValue());
            },this.AUTO_SAVING_INTERVAL);
        }
    },
    showPrintingView:function(){
        print();
    },
    renderTools:function(){
        var items = this.configuration.toolList.items,
            item = null,
            $item = null,
            $tooltip = null;
        for(var index in items){
            item = items[index];
            $item = $(this.tooltipTemp({iconClass:item.iconClass,meanClass:item.class,content:item.title}));
            $item.tooltip();
            this.$('.toolListPanel').append($item);
        }
    },
    initTempSaving:function(){        
        var that = this;
        this.editorModel.getLastFile(function(res){
            if(res==='error'){
                console.log('Failed to get temp file.');
            }else{
                that.lastFile = res;                
            }
        });
        setInterval(function(){
            that.editorModel.saveTempFile(that.getCM().getValue());
        },5000);
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
            };
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
            that = this,
            content = (this.lastFile)?this.lastFile:this.welcomContent;
            // console.log(this.lastFile);
        cm = CodeMirror(this.$('.markdownTextarea')[0], {
            mode:'markdown',
            value:content,
            lineNumbers: true,
            lineWrapping: true
        });
        that.updatePreview(cm.getValue());
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
    blurToolList:function(){
        this.toggleToolList(true);
    },
    focusToolList:function(){
        this.toggleToolList(false);
    },
    toggleToolList:function(show){
        var $toolList = this.$('.toolListPanel'),
            duration = this.configuration.toolList.duration,
            left = (show)?this.configuration.toolList.left:this.configuration.toolList.activeLeft;
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
                warningMes+='原文内容为空。 ';
            }
            if(title.length<1){
                warningMes+='标题为空。 ';
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
    saveOnLocal:function(){
        if(this.isLocalStorageAvailable()){
            localStorage.setItem(this.CONTENT_REF,this.getCM().getValue());
            this.$('[data-result="success"]').removeClass('hide');
            this.$('[data-result="fail"]').addClass('hide');
        }else{
            this.$('[data-result="success"]').addClass('hide');
            this.$('[data-result="fail"]').removeClass('hide');
        }
        this.$('[data-name="local_saving"]').modal();
    },
    showTooltip:function(event){
        var $item = $(event.currentTarget);
        $item.tooltip('show');
    },
    showModal:function(){
        // console.log(this.getCM().getValue());
        this.$('[data-name="server_saving"]').modal();
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