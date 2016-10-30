import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './main-layout.html'


Template.Main_layout.onRendered(function Main_layoutOnCreated() {
	FlowRouter.watchPathChange();
	if (!Meteor.user() && FlowRouter.current().path != '/login') {
		FlowRouter.go('/login');
	}
});

Template.Main_layout.helpers({
	mapActive() {
		FlowRouter.watchPathChange();
		return (FlowRouter.current().path == '/map');
	},
	countryActive() {
		FlowRouter.watchPathChange();
		return (FlowRouter.current().path == '/country');
	}
});