import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Users } from 'meteor/accounts-password';


Accounts.config({
	forbidClientAccountCreation : true
});

if (Meteor.isServer) {
	
	Meteor.publish('user', function() {
		return Meteor.users.find(
			{_id: this.userId},
			{fields: {name: true, color: true}}
		);
	});
	
	Accounts.onCreateUser((options, user) => {
		user.name = options.name;
		user.color = options.color;
		return user;
	});
}

Meteor.methods({
	'user.register'(emailVar, passwordVar, nameVar, colorVar) {
		
		// TODO: do data checking before registering new user
		
		Accounts.createUser({
			email: emailVar,
			password: passwordVar,
			name: nameVar,
			color: colorVar
		});
	},
});