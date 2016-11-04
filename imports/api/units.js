import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
 
export const Units = new Mongo.Collection('units');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('units', function tasksPublication() {
    return Units.find();
  });
}

Meteor.methods({
  'unit.move'(oldCoords, newCoords) {
    check(oldCoords, String);
    check(newCoords, String);
	
    Units.update({coords: oldCoords}, { $set: { coords: newCoords } });
  },
});