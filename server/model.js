Comparables = new Meteor.Collection("comparables");
Differences = new Meteor.Collection("differences");

Meteor.startup(function() {
	if (Comparables.find().count() === 0) {
		var models = [{title: "ti1", vv: "+"}, {title: "ti2"}, {title: "ti3"}, {title: "t4"}];
		for(var model in models) {
			Comparables.insert(models[model]);
		}	
	}
});

// Publish complete set of lists to all clients.
Meteor.publish('comparables', function () {
	return Comparables.find();
});

Meteor.publish('differences', function () {
	return Differences.find();
});