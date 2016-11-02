import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './login.html';


Template.Login.events({
	'submit .login': function(event){
		event.preventDefault();
		var emailVar = event.target.loginEmail.value;
		var passwordVar = event.target.loginPassword.value;
		
		Meteor.loginWithPassword(emailVar, passwordVar);
	},
	'submit .register': function(event) {
		event.preventDefault();
		var emailVar = event.target.registerEmail.value;
		var passwordVar = event.target.registerPassword.value;
		
		Accounts.createUser({
			email: emailVar,
			password: passwordVar
		});
	}
});