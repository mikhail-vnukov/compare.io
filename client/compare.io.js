

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

Template.scores.helpers({
	"superhelper" : function(context, block) {
		var ret = "";

		for(var i=0, j=context.length; i<j; i++) {
			if(!context[i][this.title]) {
				ret += "<td>N/A</td>"
			} else {
				ret = ret + "<td>" + context[i][this.title] + "</td>";				
			}

		}

		return ret + "";
	} 
});


Template.scores.events({
	'click .addtag': function (evt, tmpl) {
		Session.set('editing_addtag', this._id);
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