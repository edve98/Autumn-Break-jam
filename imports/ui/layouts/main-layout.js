import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './main-layout.html';
import '../pages/login.js';
import '../components/loading.js';


Template.Main_layout.helpers({
	mapActive() {
		FlowRouter.watchPathChange();
		return (FlowRouter.current().path == '/map');
	},
	countryActive() {
		FlowRouter.watchPathChange();
		return (FlowRouter.current().path == '/country');
	},
	regionActive() {
		FlowRouter.watchPathChange();
		return (FlowRouter.current().path == '/region/1');
	},
	authInProgress() {
		return Meteor.loggingIn();
	}
});

Template.Main_layout.events({
	'click .logout'() {
		Meteor.logout();
	}
});