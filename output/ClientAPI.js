////////////////////////////////////////////////////////////////////////////////
// ClientAPI.LampClient
var $ClientAPI_LampClient = function() {
	this.screen = null;
};
$ClientAPI_LampClient.prototype = {
	init: function(players, context) {
	},
	mouseMove: function(pointer) {
		return false;
	},
	mouseScroll: function(pointer) {
		return false;
	},
	buildUI: function(manager) {
	},
	bindKeys: function(manager) {
	},
	onClick: function(pointer) {
		return false;
	},
	mouseUp: function(pointer) {
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
