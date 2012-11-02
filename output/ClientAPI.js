////////////////////////////////////////////////////////////////////////////////
// ClientAPI.LampClient
var $ClientAPI_LampClient = function() {
	this.screen = null;
};
$ClientAPI_LampClient.prototype = {
	init: function(players, context) {
	},
	mouseMove: function(jQueryEvent) {
		return false;
	},
	mouseScroll: function(jQueryEvent) {
		return false;
	},
	buildUI: function(manager) {
	},
	bindKeys: function(manager) {
	},
	onClick: function(jQueryEvent) {
		return false;
	},
	mouseUp: function(jQueryEvent) {
		return false;
	},
	resize: function() {
	},
	draw: function(context) {
	},
	tick: function() {
	}
};
Type.registerClass(global, 'ClientAPI.LampClient', $ClientAPI_LampClient, Object);
