window.LoginView = Backbone.View.extend({

    tagName: "div",

    className: "modal hide fade",

    events : {
        'click .loginAction': 'login',
        'submit .login-form': 'login',
        'change #loginUsername': 'hideLoginError',
        'change #loginPassword': 'hideLoginError',
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).attr('data-width', 380);

        $(this.el).html($(this.template({})));
        return this;
    },

    login: function(event) {
        event.preventDefault();

        Backbone.BasicAuth.set($('#loginUsername').val(), $('#loginPassword').val());
        var token = Backbone.BasicAuth.getToken();
        //alert(token);
        var that = this;

        $.ajax({
            url       : apiRoot + '/user/me',
            dataType  : 'json',
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Basic ' + token);},

            complete: function(xhr, textStatus) {

                if(xhr.status == 401) {
                    that.displayLoginError("wrong username or password");
                }
                if(xhr.status == 200) {
                    localStorage['authToken'] = Backbone.BasicAuth.getToken();
                    that.closeModal();

                    if(typeof(localStorage['redirectUrl']) != 'undefined' && localStorage['redirectUrl'] != null) {
                        var redirectUrl = localStorage['redirectUrl'];
                        window.location.href = redirectUrl;
                        setTimeout(function(){
                            window.location.reload();
                        }, 100);
                    }
                }
            } 
        });
    },

    closeModal: function(event) {
        $('.closeModal').trigger('click');
    },

    displayLoginError: function(message) {
        
        //this.errorModal = $('<div id="static" class="modal hide fade" tabindex="-1" data-backdrop="static" data-keyboard="false" style="display: none; margin-top: -61.5px;" aria-hidden="true"><div class="modal-body" style=""><p>Mauvais email ou mot de passe. Veuillez réessayer.</p></div><div class="modal-footer"><button type="button" data-dismiss="modal" class="btn red">Ok</button></div></div>').modal({"backdrop": "static"});
        
        $('.loginError').html(message);
        $('.loginError').removeClass('hide');
    },

    hideLoginError: function(message) {
        $('.loginError').addClass('hide');
    }
});