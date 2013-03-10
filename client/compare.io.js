

////////// Todos //////////
Comparables = new Meteor.Collection("comparables");
Meteor.subscribe("comparables");
Differences = new Meteor.Collection("differences");
Meteor.subscribe("differences");

Template.scores.comparables = function () {
	var models = Comparables.find();
	return models.fetch();
};

Template.scores.differences = function () {
	var models = Differences.find();
	return models.fetch();
};

editing_diff = function (comparable, feature) {
  	var sessionObject = Session.get('editing_difference');
  	if (sessionObject !== undefined) {
		console.log("E " + comparable.title + ":" + feature.title);
		console.log("A " + sessionObject.comparable + ":" + sessionObject.feature);
	}
  	return sessionObject !== undefined 
	  	&& comparable.title === sessionObject.comparable 
	  	&& sessionObject.feature === feature.title;
};

Template.scores.helpers({
	"superhelper" : function(comparables, options) {
		var ret = "";

		for(var i=0, j=comparables.length; i<j; i++) {
			var comparable = comparables[i];
			ret = ret + options.fn({
				comparable: comparable.title, 
				feature: this.title, 
				value: comparable[this.title],
				editing: editing_diff(comparable, this)
			});
		}
		return ret;
	} 
});

Template.scores.events({
	'click .addtag': function (evt, tmpl, currentTarget) {
		Session.set('editing_difference', this);
		Meteor.flush(); // update DOM before focus
		activateInput(tmpl.find("#edittag-input"));
	}
});
Template.scores.events(okCancelEvents(
	'#new-todo',
	{
		ok: function (text, evt) {
			var tag = Session.get('tag_filter');
			Differences.insert({
				title: text,
			});
			evt.target.value = '';
		}
	}));