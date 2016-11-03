import { Template } from 'meteor/templating';
import { Units } from '/imports/api/units.js';
import './map.html';

Template.Map.rendered = function () {
	var map_container_topmargin = parseInt($(".map_container").css('margin-top'));
	var window_height = parseInt($(window).height());
	$(".map_container").css( "height", window_height - map_container_topmargin );
	
	
	
	$(window).resize(function() {
		map_container_topmargin = parseInt($(".map_container").css('margin-top'));
		window_height = parseInt($(window).height());
		$(".map_container").css( "height", window_height - map_container_topmargin );
		console.log(window_height - map_container_topmargin);
	});
	
	var interval = ['?', -1, -1, -1, -1];
	var orgspeed = 15;
	
	function move(dir){
		switch(dir){
			case 1:
				var direction = 1;
				var to = 'top';
				var limit = -1*($("#map").height()-$(".map_container").height());
				break;
			case 2:
				var direction = -1;
				var to = 'left';
				var limit = -1*($("#map").width()-$(".map_container").width());
				break;
			case 3:
				var direction = -1;
				var to = 'top';
				var limit = -1*($("#map").height()-$(".map_container").height());
				break;
			case 4:
				var direction = 1;
				var to = 'left';
				var limit = -1*($("#map").width()-$(".map_container").width());
				break;
		}
		
		var speed = direction*orgspeed;
		if(interval[dir] == -1){
			interval[dir] = setInterval(function(){
				var val = parseInt($("#map").css(to));
				
				if(val+speed <= 0 && val+speed >= limit){
					$("#map").css(to, val+speed);
				}else if(val+speed < limit){
					$("#map").css(to, val - (val - limit));
				}else if(val+speed > 0){
					$("#map").css(to, val - val);
				}
			}, 1);
		}
		
	}
	
	function clear(dir){
		if(interval[dir] != -1){
			clearInterval(interval[dir]);
			interval[dir] = -1;
		}
	}

	$('body').keydown(function (e){
		switch(e.keyCode) {
			case 37:
				move(4);
				break;
			case 38:
				move(1);
				break;
			case 39:
				move(2);
				break;
			case 40:
				move(3);
				break;
			case 65:
				move(4);
				break;
			case 87:
				move(1);
				break;
			case 68:
				move(2);
				break;
			case 83:
				move(3);
				break;
		}
	});
	$('body').keyup(function (e){
		switch(e.keyCode) {
			case 37:
				clear(4);
				break;
			case 38:
				clear(1);
				break;
			case 39:
				clear(2);
				break;
			case 40:
				clear(3);
				break;
			case 65:
				clear(4);
				break;
			case 87:
				clear(1);
				break;
			case 68:
				clear(2);
				break;
			case 83:
				clear(3);
				break;
		}
	});
	
	
	$("#left").bind("touchstart", function(){
		move(4);
	});
	$("#right").bind("touchstart", function(){
		move(2);
	});
	$("#up").bind("touchstart", function(){
		move(1);
	});
	$("#down").bind("touchstart", function(){
		move(3);
	});
	
	$("#left").bind("touchend", function(){
		clear(4);
	});
	$("#right").bind("touchend", function(){
		clear(2);
	});
	$("#up").bind("touchend", function(){
		clear(1);
	});
	$("#down").bind("touchend", function(){
		clear(3);
	});
	
	$("#left").mousedown(function(){
		move(4);
	});
	$("#right").mousedown(function(){
		move(2);
	});
	$("#up").mousedown(function(){
		move(1);
	});
	$("#down").mousedown(function(){
		move(3);
	});
	
	$("#left").mouseup(function(){
		clear(4);
	});
	$("#right").mouseup(function(){
		clear(2);
	});
	$("#left").mouseout(function(){
		clear(4);
	});
	$("#right").mouseout(function(){
		clear(2);
	});
	$("#up").mouseup(function(){
		clear(1);
	});
	$("#down").mouseup(function(){
		clear(3);
	});
	$("#up").mouseout(function(){
		clear(1);
	});
	$("#down").mouseout(function(){
		clear(3);
	});
};
  
Template.Map.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('units');
  
});

Template.Map.helpers({
	hexs(){
		var xlen = 30;
		var ylen = 20;
		//var color = 'radial-gradient(#4bef4b, #1daf1d)';
		hexs = [];
		
		for(var i=0; i<ylen; i++){
			hexs[i] = [];
			for(var u=0; u<xlen; u++){
				hexs[i][u] = {};
				//hexs[i][u].color = color;
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