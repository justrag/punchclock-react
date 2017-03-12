FlowRouter.route('/', {
	action: function() {
		FlowRouter.redirect('/clock')
	}
});

FlowRouter.route("/clock", {
	name: "clock",
	action: function() {
		BlazeLayout.render("layout", {
			main: "clock"
		});
	},
});


FlowRouter.route("/stats", {
	name: "stats",
	action: function() {
		BlazeLayout.render("layout", {
			main: "stats"
		});
	},
});

FlowRouter.route("/settings", {
	name: "settings",
	action: function() {
		BlazeLayout.render("layout", {
			main: "settings"
		});
	},
});

/*
FlowRouter.route("/sign-out", {
	name: "sign-out",
	action: function() {
		Meteor.logout();
		FlowRouter.redirect('/clock');
	},
});
*/

FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);