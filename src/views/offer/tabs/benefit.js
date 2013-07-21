window.BenefitStrategyView = window.ParticipationStrategyView.extend({

    save: function(event) {
        event.preventDefault();
        var schema = this.extractJsonView();
        
        var strategy = this.extractStrategyData();

        var updatedFields = {
            "benefit_strategy": strategy,
            'benefit_schema'  : schema
        };
        
        this.saveModel(updatedFields);
    },

    extractStrategyData: function() {
        return this.model.getBenefitStrategyFromId($('#form_strategy').val());
    }
});