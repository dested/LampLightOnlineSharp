﻿////////////////////////////////////////////////////////////////////////////////
// ClientAPI.LampClient
var $ClientAPI_LampClient = function() {
	this.windowLocation = null;
};
$ClientAPI_LampClient.prototype = {
	init: function(players, context) {
	},
	mouseMove: function(jQueryEvent) {
		return false;
	},
	buildUI: function(manager) {
	},
	onClick: function(jQueryEvent) {
		return false;
	},
	mouseUp: function(jQueryEvent) {
		return false;
	},
	draw: function(context) {
	},
	tick: function() {
	}
};
Type.registerClass(global, 'ClientAPI.LampClient', $ClientAPI_LampClient, Object);
