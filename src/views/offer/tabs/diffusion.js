window.OfferDiffusionView = Backbone.View.extend({

    tagName: "div",

    className: "",

    events : {
    },

    test: function(){
    },

    initialize: function () {
        //this.render();
    },

    render: function () {
        $(this.el).html($(this.template(this.model.toJSON())));
        return this;
    }
    
});