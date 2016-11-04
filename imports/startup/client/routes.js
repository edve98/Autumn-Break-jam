import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Meteor } from 'meteor/meteor';

import '/imports/ui/layouts/main-layout.js';
import '/imports/ui/pages/login.js';
import '/imports/ui/pages/map.js';
import '/imports/ui/pages/country.js';
import '/imports/ui/pages/region.js';
import '/imports/ui/pages/not-found.js';


FlowRouter.route('/', {
	action: function() {
		FlowRouter.go('/map');
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

FlowRouter.route('/region/:id', {
	name: "region",
	action: function(params) {
		BlazeLayout.render('Main_layout', { content: "Region" });
	}
});

FlowRouter.notFound = {
	action: function() {
		BlazeLayout.render('Main_layout', { content: 'Not_found' });
	},
};
