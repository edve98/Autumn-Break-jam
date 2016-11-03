import './country.html'
import { Tempalte } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.YourCountry.helpers({
	Info(){
		return Meteor.user()._id;
	}
});
