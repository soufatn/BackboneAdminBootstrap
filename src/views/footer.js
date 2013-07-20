window.FooterView = Backbone.View.extend({

    tagName: "div",

    className: "",

    events : {
        
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html($(this.template({})));
        return this;
    }
    
});