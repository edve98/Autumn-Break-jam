import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
 
export const Units = new Mongo.Collection('units');

Meteor.methods({
  'unit.move'(oldCoords, newCoords) {
    check(oldCoords, String);
    check(newCoords, String);
	
    Units.update({coords: oldCoords}, { $set: { coords: newCoords } });
  },
});