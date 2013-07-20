window.HeaderView = Backbone.View.extend({

    tagName: "div",

    className: "navbar-inner",

    events : {
    },

    initialize: function () {
        
    },

    render: function () {
        $(this.el).html($(this.template(this.model.toJSON())));
        return this;
    }

});