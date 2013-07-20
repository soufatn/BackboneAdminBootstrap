window.OfferView = Backbone.View.extend({

    tagName: "div",

    className: "",

    events : {
        'click button[type=submit]': 'save',
        'click button.reset'       : 'render'
    },

    initialize: function () {

    },

    render: function () {
        console.log('render offer');
        $(this.el).html($(this.template(this.model.toJSON())));
        
        setTimeout(function(){
            Template.beautifyForms();
            //FormComponents.init();
        }, 100);

        return this;
    },

    save: function(event) {
        event.preventDefault();
        
        var updataedFields = {
            'name'        : $('#form_name').val(),
            'start_date'  : $('#start_date').val(),
            'end_date'    : $('#end_date').val(),
            'is_activated': $('input[name=isOfferActivated]:checked').val() == 1 ? true : false
        };

        this.saveModel(updataedFields);
    },

    saveModel: function(fields) {
        this.showLoader();
        var that = this;
        this.model.save(fields, {
            success: function() {
                that.hideLoader();
                that.render();
                $(that.getModal("Enregistrement effectué avec succes.")).modal({"backdrop": "static"});  
            }
        });
    },

    showLoader: function() {
        $('button[type=submit]').html('Chargement...');

        $.fn.modalmanager.defaults.resize = true;
        $.fn.modalmanager.defaults.spinner = '<div class="loading-spinner fade" style="width: 200px; margin-left: -100px;"><img src="lib/metronic_1.3/template_content/assets/img/ajax-modal-loading.gif" align="middle">&nbsp;<span style="font-weight:300; color: #eee; font-size: 18px; font-family:Open Sans;">&nbsp;Loading...</div>';
        $('body').modalmanager('loading');
    },

    hideLoader: function() {
        $('button[type=submit]').html('<i class="icon-ok"></i> Enregister');
    },
    
    getModal: function(message) {
        return $(
        '<div id="static" class="modal hide fade" tabindex="-1" data-backdrop="static" data-keyboard="false">'
            + '<div class="modal-body">'
            +    '<p>' + message + '</p>'
            +'</div>'
            +'<div class="modal-footer">'
            //+    '<button type="button" data-dismiss="modal" class="btn">Cancel</button>'
            +    '<button type="button" data-dismiss="modal" class="btn green">Ok</button>'
            +'</div>'
        +'</div>');
    }
});