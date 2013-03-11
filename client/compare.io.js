

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

editingDiff = function (comparable, feature) {
  	var sessionObject = Session.get('editingDifference');
  	return sessionObject !== undefined 
	  	&& comparable._id === sessionObject.comparable 
	  	&& sessionObject.feature === feature._id;
};

Template.scores.helpers({
	"superhelper" : function(comparables, options) {
		var ret = "";

		for(var i=0, j=comparables.length; i<j; i++) {
			var comparable = comparables[i];
			ret = ret + options.fn({
				comparable: comparable._id, 
				feature: this._id, 
				value: comparable.features === undefined ? undefined : comparable.features[this._id],
				editing: editingDiff(comparable, this)
			});
		}
		return ret;
	} 
});

Template.scores.events({
	'click .addtag': function (evt, tmpl, currentTarget) {
		Session.set('editingDifference', this);
		Meteor.flush();
		activateInput(tmpl.find("#edittag-input"));
	}
});
Template.scores.events(okCancelEvents(
	'#edittag-input',
	{
		ok: function (text, evt) {
			var comparable = Comparables.findOne(this.comparable);
			comparable.features = comparable.features || {};
			comparable.features[this.feature] = text;
			Comparables.update(this.comparable, comparable);
			evt.target.value = text;
			Session.set('editingDifference', undefined);
			Meteor.flush();
		}
	}));