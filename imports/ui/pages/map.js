import { Template } from 'meteor/templating';
import { Units } from '../api/units.js';

import './map.html';

Template.hex.helpers({
	hasUnit: function(){
		
	},
	hexs(){
		
		hexs = [
			[
				{ // 0, 0
					color: 'green',
				},
				{ // 1, 0
					color: 'green',
				},
				{ // 2, 0
					color: 'green',
				},
				{ // 3, 0
					color: 'green',
				},
				{
					color: 'green',
				},
				{
					color: 'green',
				},
			],
			[
				{ // 0, 0
					color: 'green',
				},
				{ // 1, 0
					color: 'green',
				},
				{ // 2, 0
					color: 'green',
				},
				{ // 3, 0
					color: 'green',
				},
				{
					color: 'green',
				},
				{
					color: 'green',
				},
			],
			[
				{
					color: 'green',
				},
				{
					color: 'green',
				},
				{
					color: 'green',
				},
				{
					color: 'green',
				},
				{
					color: 'green',
				},
				{
					color: 'green',
				},
			],
			[
				{
					color: 'green',
				},
				{
					color: 'green',
				},
				{
					color: 'green',
				},
				{
					color: 'green',
				},
				{
					color: 'green',
				},
				{
					color: 'green',
				},
			],
			[
				{
					color: 'green',
				},
				{
					color: 'green',
				},
				{
					color: 'green',
				},
				{
					color: 'green',
				},
				{
					color: 'green',
				},
				{
					color: 'green',
				},
			],
		]
		
		var coords, x, y;
		var units = Units.find({});
		console.log(units.name);
		
		units.forEach(function(element){
			console.log(element.coords);
			xy = element.coords;
			coords = xy.split("-");
			
			x = parseInt(coords[0]);
			y = parseInt(coords[1]);
			
			unit = {
				coords: xy,
				name: element.name,
				health: element.health,
				damage: element.damage,
			};
			
			hexs[y][x].unit = unit;
			
			console.log(hexs[y][x]);
			
		});
		
		console.log(hexs[0]);
		
		
		return hexs;
	},
	firstrow: function(y){
		if(y == 0){
			return "first-row";
		}
	},
	evenfirst: function(x, y){
		if(x == 0 && y%2 != 0){
			return "even-first";
		}
	},
});


Template.hex.events({
	'click .hex'(){
		// Unit movement
		var moveid = event.target.id;
		var unitid;
		
		if($("#" + moveid).hasClass("move-hex") && !$("#" + moveid).hasClass("unit")){ // Move success
			unitid = $(".active-hex").attr("id");
			Meteor.call('unit.move', unitid, moveid);
		}
		
		// Resets hexs
		$(".hex").removeClass("active-hex");
		$(".hex").removeClass("move-hex");
		$(".hex").removeClass("abletofight-hex");
		
	},
	'click .unit'(event){ // Unit select
		var id = event.target.id;
		console.log(event.target);
		
		console.log("#" + id);
		$("#" + id).addClass("active-hex");
		
		var coords = id.split("-");
		var x = parseInt(coords[0]);
		var y = parseInt(coords[1]);
		
		if(y%2 == 0){
			var xs = [x+1, x-1, x-1, x-1, x, x];
			var ys = [y, y, y-1, y+1, y+1, y-1];
		}else{
			var xs = [x+1, x, x+1, x+1, x, x-1];
			var ys = [y-1, y-1, y, y+1, y+1, y];
		}
		
		for(var i=0; i<xs.length; i++){
			if($("#" + xs[i] + "-" + ys[i]).hasClass('unit')){
				$("#" + xs[i] + "-" + ys[i]).addClass("abletofight-hex");
			}else{
				$("#" + xs[i] + "-" + ys[i]).addClass("move-hex");
			}
		}
	},
});