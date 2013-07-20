window.MenuView = Backbone.View.extend({

    tagName: "ul",

    className: "page-sidebar-menu",

    events : {
        'submit .search' : 'search',
        'click .locale'    : 'changeLocale'
    },

    initialize: function () {
        
    },

    render: function (isAuth) {
        //console.log(apiRoot);
        //console.log(appUrl);
        $(this.el).html($(this.template({})));
        return this;
    },

    renderLogged: function(userData) {
        $(this.el).html($(this.template({urlApiLogin: urlApiLogin, isAuthenticated : true, user : userData})));
        return this;
    },

    selectMenuItem: function (menuItem) {
        $('.nav').find('li').removeClass('active');
        $(this.el).find('li').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
    },

    search: function(event) {
        event.preventDefault();
        window.location.href = "#search/" + $('#searchValue').val();
    },

    changeLocale: function(e) {
        var locale = e.originalEvent.target.rel;
        i18n.setLng(locale)
        window.location.reload();
    }

});