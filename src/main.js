window.Router = Backbone.Router.extend({

    routes: {
        "setLocale/:locale" : "setLocale",
        "login"             : "login",
        "logout"            : "logout",
        ""                  : "dashboard",
        "dashboard"         : "dashboard",
        "offers"                 : "offers",
        "offer/:id"              : "offer",
        "offer/:id/participation": "offerParticipation",
        "offer/:id/eligibility"  : "offerEligibility",
        "offer/:id/benefit"      : "offerBenefit",
        "offer/:id/diffusion"    : "offerDiffusion",
        "operations"             : "operations"
        
    },

    initialize: function () {
        //this.setI18n('en');
        var that = this;

        Backbone.BasicAuth.setToken(localStorage['authToken']);

        var me = new Me();

        var that = this;


        that.menuView = new MenuView();
        $('#appMenu').html(that.menuView.render().el);
        
        that.loadingContent();
        me.fetch({
            success: function (data) {

              that.removeLoadingContent();

              that.headerView = new HeaderView({model: data});
              $('#appHeader').html(that.headerView.render().el);


              that.footerView = new FooterView();
              $('#appFooter').html(that.footerView.el);

              Template.init();
            }
        });
    },

    /* Utils functions */
    loadingContent : function() {
        $("#appContent").html('');
        var opts = {
          lines: 15, // The number of lines to draw
          length: 9, // The length of each line
          width: 10, // The line thickness
          radius: 41, // The radius of the inner circle
          corners: 1, // Corner roundness (0..1)
          rotate: 0, // The rotation offset
          direction: 1, // 1: clockwise, -1: counterclockwise
          color: '#000', // #rgb or #rrggbb
          speed: 1.1, // Rounds per second
          trail: 60, // Afterglow percentage
          shadow: false, // Whether to render a shadow
          hwaccel: false, // Whether to use hardware acceleration
          className: 'spinner', // The CSS class to assign to the spinner
          zIndex: 2e9, // The z-index (defaults to 2000000000)
          top: 'auto', // Top position relative to parent in px
          left: 'auto' // Left position relative to parent in px
        };
        var target = document.getElementById('appContent');
        this.spinner = new Spinner(opts).spin(target);
        //this.spinner.el.style.z-index = 100;
        $(this.spinner.el).css({'z-index':'100'});
    },

    removeLoadingContent : function() {
        if(this.spinner)
            $(this.spinner.el).remove();
    },

    logout : function() {
        localStorage['authToken'] = null;
        window.location.href = '#dashboard';
        window.location.reload();
    },

    login : function() {
      var loginView = new LoginView();
      $(loginView.el).modal({"backdrop": "static"});    
    },

    dashboard: function() {
      this.menuView.selectMenuItem('dashboard');

      var dashboard = new DashBoard();

      var that = this;
      that.loadingContent();
      dashboard.fetch({
          success: function (data) {
            that.removeLoadingContent();
            $('#appContent').html(new DashBoardView({model: data}).render().el);
          }
      });

       //Template.init();
    },

    offer: function(id) {

      this.menuView.selectMenuItem('offer');
      
      var offer = new Offer({id: id});

      var that = this;
      that.loadingContent();
      offer.fetch({
          success: function (data) {
            that.removeLoadingContent();
            var el = new OfferView({model: data}).render().el;
            $('#appContent').html(el);
            //$(el).find("select, input, a.button, button").uniform();
            //Template.beautifyForms();
            Template.beautifyForms();
            //FormComponents.init();
          }
      });
    },

    offerParticipation: function(id) {
      this.menuView.selectMenuItem('offer');
      
      var offer = new Offer({id: id});

      var that = this;
      that.loadingContent();
      offer.fetch({
          success: function (data) {
            that.removeLoadingContent();
            $('#appContent').html(new ParticipationStrategyView({model: data}).render().el);
            Template.beautifyForms();
            //FormComponents.init();
          }
      });
    },

    offerEligibility: function(id) {
      this.menuView.selectMenuItem('offer');
      
      var offer = new Offer({id: id});

      var that = this;
      that.loadingContent();
      offer.fetch({
          success: function (data) {
            that.removeLoadingContent();
            $('#appContent').html(new EligibilityStrategyView({model: data}).render().el);
            Template.beautifyForms();
            //FormComponents.init();
          }
      });
    },


    offerBenefit: function(id) {
      this.menuView.selectMenuItem('offer');
      
      var offer = new Offer({id: id});

      var that = this;
      that.loadingContent();
      offer.fetch({
          success: function (data) {
            that.removeLoadingContent();
            $('#appContent').html(new BenefitStrategyView({model: data}).render().el);
            Template.beautifyForms();
            //FormComponents.init();
          }
      });
    },

    offerDiffusion: function(id) {

      this.menuView.selectMenuItem('offer');
      
      var offer = new Offer({id: id});

      var that = this;
      that.loadingContent();
      offer.fetch({
          success: function (data) {
            that.removeLoadingContent();
            $('#appContent').html(new OfferDiffusionView({model: data}).render().el);
            Template.beautifyForms();
            FormComponents.init();
          }
      });
    },

    offers: function() {
      this.menuView.selectMenuItem('offer');

      var that = this;
      that.loadingContent();
      setTimeout(function(){
          that.removeLoadingContent();
          
          $('#appContent').html(new OffersView().render().el);
      }, 700);

    },

    operations: function() {
      this.menuView.selectMenuItem('operation');

      var that = this;
      that.loadingContent();
      setTimeout(function(){
          that.removeLoadingContent();
          $('#appContent').html('@TODO');
      }, 700);

    }


});

/**
 * Internationalization
 */
i18n.init({preload: [], debug: true });
//i18n.setLng('en');

/**
 * Template async loading
 */
templateLoader.load(
    [
     "HeaderView",
     "MenuView",
     "FooterView",
     "LoginView",
     "DashBoardView",
     "OffersView",

     //Offer edit
     "OfferView",
       "ParticipationStrategyView",
       "EligibilityStrategyView",
       "BenefitStrategyView",
       "OfferDiffusionView"
     ],
    function () {
        var app = new Router();    
        Backbone.history.start();
        //Backbone.history.start({pushState: true})
    }
);

//Redirect si utilisateur non authentifié
$(document).ajaxComplete( function(e, xhr, options){
    
    if(xhr.status == 401) {
        if(window.location.href.indexOf("login") == -1)
          localStorage['redirectUrl'] = window.location.href;
        
        window.location.href = '#login';
    }
    

    
    if(xhr.status == 403) {
      var modalContent =   
      + '<div id="static" class="modal hide fade" tabindex="-1" data-backdrop="static" data-keyboard="false">'
      +    '<div class="modal-body">'
      +      "<p>Vous n'avez pas les droits pour effectuer cette tache</p>"
      +    '</div>'
      +    '<div class="modal-footer">'
      +      '<button type="button" data-dismiss="modal" class="btn green">Ok</button>'
      +    '</div>'
      +  '</div>';

      //$(modalContent).modal({"backdrop": "static"});

      //var loginView = new LoginView();
      //$(loginView.el).modal({"backdrop": "static"});
    }

    if(xhr.status == 404) {
      //@TODO
    }
        //alert('not logged');

    //console.log(xhr);
    /*
    //alert(xhr.status);
    if(xhr.status == '401')
        window.location.replace('#/login');
    //alert('veullez vous connecter');
    //console.log(xhr);
    //window.location.replace('#/login');
    */
});

