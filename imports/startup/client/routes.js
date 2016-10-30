import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Meteor } from 'meteor/meteor';

import '/imports/ui/layouts/main-layout.js';
import '/imports/ui/pages/login.js';
import '/imports/ui/pages/map.js';
import '/imports/ui/pages/country.js';
import '/imports/ui/pages/not-found.js';


FlowRouter.route('/', {
	action: function() {
		FlowRouter.go('/login');
	}
});

FlowRouter.route('/login', {
	action: function() {
		BlazeLayout.render('Main_layout', { content: "Login" });
	}
});

FlowRouter.route('/logout', {
	action: function() {
		Meteor.logout();
		FlowRouter.go('/login');
	}
});

FlowRouter.route('/map', {
	action: function() {
		BlazeLayout.render('Main_layout', { content: "Map" });
	}
});

FlowRouter.route('/country', {
	action: function() {
		BlazeLayout.render('Main_layout', { content: "Country" });
	}
});

FlowRouter.notFound = {
	action: function() {
		BlazeLayout.render('Main_layout', { content: 'Not_found' });
	},
};
