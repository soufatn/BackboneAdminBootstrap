window.Offer = Backbone.Model.extend({

	idAttribute: "id",

    urlRoot: apiRoot + "/user/useroffers",

    initialize:function () {
        
    },

    getParticipationStrategyFromId: function(id) {
    	var participation = _.find(this.get('available_strategies').participation, function(obj){
    		return obj.id == id;
    	});
    	return participation;
    },

    getEligibilityStrategyFromId: function(id) {
    	var eligibility = _.find(this.get('available_strategies').eligibility, function(obj){
    		return obj.id == id;
    	});
    	return eligibility;
    },

     getBenefitStrategyFromId: function(id) {
    	var benefit = _.find(this.get('available_strategies').benefit, function(obj){
    		return obj.id == id;
    	});
    	return benefit;
    }

});