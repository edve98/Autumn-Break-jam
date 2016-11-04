import './region.html';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Regions } from '../../api/regions.js';

Template.Region.helpers({
	type(){
		Meteor.subscribe('regions');
		var id = parseInt(FlowRouter.getParam("id"));
		var region = Regions.findOne({id: id});
		var type = false;
		if (typeof region !== 'undefined') { 
			if(region.type == "Village")
				type = false;
			else
				type = true;
			return type;
		}
		else return [];
	},
	none(){
		Meteor.subscribe('regions');
		var id = parseInt(FlowRouter.getParam("id"));
		var region = Regions.findOne({id: id});
		var none = false;
		if (typeof region !== 'undefined') { 
			if(region.type != "Village" && region.type != "City")
				none = true;
			console.log(region.id);
			return none;
		}
		else return [];
	}
});

Template.Information.helpers({
	region() {
		Meteor.subscribe('regions');
		var id = parseInt(FlowRouter.getParam("id"));
		return Regions.findOne({id: id});
	},
	all_data(){
		Meteor.subscribe('regions');
		var regionCursor = Regions.find({});
		var region;
		var population_all = 0;
		var support_all = 0;
		var units_all = 0;
		var count = 0;
		regionCursor.forEach(function(region) {
		    population_all += region.population;
			support_all += region.support;
			units_all += region.units;
			count += 1;
		});
		support_all = Math.round((support_all / count) * 100) / 100;
		support_all = support_all.toFixed(2);
		return {population_all: population_all, support_all: support_all, units_all: units_all};
	}
});

Template.building_options.events({
	'submit .building_form'(event) {
    event.preventDefault();
    const target = event.target;
    const id = target.id.value;
	Meteor.call('buildings.upgrade', {
		  id: id
		}, (err, res) => {
		  if (err) {
		    alert(err);
		  } else {
		    // success!
		  }
		});
  },
});

Template.army.events({
	'submit .army_summon'(event) {
    event.preventDefault();
    const target = event.target;
    const id = target.id.value;
	const number = target.number.value;
	Meteor.call('army_summon', {
		  id: id,
		  number: number
		}, (err, res) => {
		  if (err) {
		    alert(err);
		  } else {
		    // success!
		  }
		});
  },
});

Template.type_options.events({
	'submit .type_form'(event) {
    event.preventDefault();
    const target = event.target;
    const id = target.id.value;
	const type_chosen = target.type.value;
	Meteor.call('type.form', {
		  id: id,
		  type_chosen: type_chosen
		}, (err, res) => {
		  if (err) {
		    alert(err);
		  } else {
		    // success!
		  }
		});
  },
});





