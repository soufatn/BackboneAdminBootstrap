window.EligibilityStrategyView = window.ParticipationStrategyView.extend({

    save: function(event) {
        event.preventDefault();
        var schema = this.extractJsonView();
        
        var strategy = this.extractStrategyData();

        var updatedFields = {
            "eligibility_strategy": strategy,
            'eligibility_schema'  : schema
        };
        
        this.saveModel(updatedFields);
    },

    extractStrategyData: function() {
        return this.model.getParticipationStrategyFromId($('#form_strategy').val());
    }
});