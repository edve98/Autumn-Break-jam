import { Template } from 'meteor/templating';
import { Units } from '/imports/api/units.js';

/*console.log("\\/");
console.log(Units.find({}));
console.log("/\\");*/

import './map.html';

/*Template.Map.helpers({
	hasUnit: function(){
		return "Yeah!";
	},
});*/

Template.Map.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('units');
});

Template.Map.helpers({
	hasUnit: function(){
		
	},
	hexs(){
		var xlen = 6;
		var ylen = 6;
		var color = 'green';
		hexs = [];
		
		for(var i=0; i<ylen; i++){
			hexs[i] = [];
			for(var u=0; u<xlen; u++){
				hexs[i][u] = {};
				hexs[i][u].color = color;
			}
		}
		
		
		var coords, x, y;
		var units = Units.find({});
		var foundhex = true;
		
		units.forEach(function(element){
			foundhex = true;
			xy = element.coords;
			coords = xy.split("-");
			
			x = parseInt(coords[0]);
			y = parseInt(coords[1]);
			
			if(typeof hexs[y] != 'undefined'){ // Hex y not found
				if(typeof hexs[y][x] != 'undefined'){ // Hex x not found
					unit = {
						coords: xy,
						name: element.name,
						health: element.health,
						damage: element.damage,
					};
					hexs[y][x].unit = unit;
				}else{
					foundhex = false;
				}
			}else{
				foundhex = false;
			}
			
			if(!foundhex){
				console.log("*Alert: unit " + xy + " hex not found!");
			}
		});
		
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


Template.Map.events({
	'click .hex'(event){
		//if (event.button == 2) { // Right button clicked
		// Unit movement
		var moveid = event.target.id;
		var unitid;
		
		if($("#" + moveid).hasClass("move-hex") && !$("#" + moveid).hasClass("unit")){ // Move success
			unitid = $(".active-hex").attr("id");
			Meteor.call('unit.move', unitid, moveid);
		}
		//}
		
		// Resets hexs
		$(".hex").removeClass("active-hex");
		$(".hex").removeClass("move-hex");
		$(".hex").removeClass("abletofight-hex");
		
	},
	'click .unit'(event){ // Unit select
		//if (event.button == 2) { // Right button clicked
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
        //}
	},
});