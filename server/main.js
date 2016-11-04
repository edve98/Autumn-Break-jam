import { Meteor } from 'meteor/meteor';
import { Regions } from '../imports/api/regions.js';
import { Buildings } from '../imports/api/buildings.js';
import '../imports/api/units.js';
import '../imports/api/users.js';

Meteor.startup(() => {
	// code to run on server at startup
});

Meteor.publish('regions', function() {
  return Regions.find({});
});

Meteor.methods({
    'buildings.upgrade'({ id }) {
        new SimpleSchema({
          id: { type: Int }
        }).validate({id});
        
        const region = Regions.findOne({id: id});
        
        if (region.owner_id != Meteor.userId()) {
          throw new Meteor.Error('buildings.upgrade.unauthorized',
            'Cannot upgrade buildings in a different country!');
        }
    },
    'army_summon'({ id, number }) {
        new SimpleSchema({
            id: { type: Int },
            number: { type: Int }
        }).validate({id, number});

        const region = Regions.findOne({id: id});

        if (region.owner_id != Meteor.userId()) {
            throw new Meteor.Error('buildings.upgrade.unauthorized',
                'Cannot summon army in a different country!');
        }
    },
    'type.form'({ id, type_chosen }) {
        new SimpleSchema({
            id: { type: Int },
            type_chosen: { type: String }
        }).validate({id, type_chosen});

        const region = Regions.findOne({id: 2});
        console.log("works");
        if (region.owner_id != Meteor.userId()) {
            throw new Meteor.Error('buildings.upgrade.unauthorized',
                'Cannot summon army in a different country!');
        }
        if(region.type != ""){
            throw new Meteor.Error('buildings.upgrade.unauthorized',
                'This region already has a type');
        }
        if(type_chosen != "village" && type.chosen != "city"){
            throw new Meteor.Error('buildings.upgrade.unauthorized',
                'Invalid input');
        }
        console.log('works');
    }
});