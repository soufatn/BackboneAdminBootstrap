window.ParticipationStrategyView = window.OfferView.extend({

    events : {
        'click button[type=submit]': 'save',
        'click button.reset'       : 'render',
        'change #form_strategy'    : 'setJsonSchema'
    },

    save: function(event) {
        event.preventDefault();
        var schema = this.extractJsonView();
        
        var strategy = this.extractStrategyData();

        var updatedFields = {
            "participation_strategy": strategy,
            'participation_schema'  : schema
        };
        
        this.saveModel(updatedFields);
    },

    extractJsonView: function() {
        return window.jsonEditor.get();
    },

    setJsonSchema: function() {
        var container = document.getElementById("jsoneditor");
        container.innerHTML = "";
        var options = {
            //mode: mode.value,
            mode: "tree",
            error: function (err) {
                alert(err.toString());
            }
        };

        var strategy = this.extractStrategyData();
        var json     = JSON.parse(strategy.example_schema);
        window.jsonEditor = new jsoneditor.JSONEditor(container, options, json);
    },

    extractStrategyData: function() {
        return this.model.getParticipationStrategyFromId($('#form_strategy').val());
    }

});