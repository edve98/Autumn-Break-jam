import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '/imports/ui/layouts/main-layout.js';
import '/imports/ui/pages/login.js';
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

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render('Main_layout', { content: 'Not_found' });
  },
};
