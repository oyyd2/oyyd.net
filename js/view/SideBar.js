var SideBar = Backbone.View.extend({
    initialize:function(){

    },
    render:function(){
        this.$el.html(this.template);
        this.initSideBar();
    },
    initSideBar:function(){
        var that = this;
        this.$("#menu-toggle").click(function(e) {
            e.preventDefault();
            that.$("#wrapper").toggleClass("active");
        });
    },
    template: _.template($('template#SideBar').html())
});