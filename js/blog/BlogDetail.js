var app = angular.module('BlogDetail',[]);

app.directive('markDown',function(){
	var languageOverrides = {
        js: 'javascript',
        html: 'xml',
        'c++':'cpp'
    };
	function link(s,e,a){
		marked.setOptions({
            highlight: function(code, lang){
                if(languageOverrides[lang]) lang = languageOverrides[lang];
                return hljs.getLanguage(lang) ? hljs.highlight(lang, code).value : code;
            }
        });
		var content = marked(e.find('p.markdownContent').html());
		e.html(content);
	}
	return{
		'link':link
	};
});