window.Me = Backbone.Model.extend({

    //urlRoot: WsRoot + "/me",
    
    url: apiRoot + '/user/me',

    initialize:function () {

    }

});