window.OffersView = Backbone.View.extend({

    tagName: "div",

    className: "",

    events : {
        
    },

    initialize: function () {
    },

    render: function () {
        $(this.el).html($(this.template({})));
        return this;
    },
    
});