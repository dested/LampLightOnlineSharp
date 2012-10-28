////////////////////////////////////////////////////////////////////////////////
// ClientAPI.LampClient
var $ClientAPI_LampClient = function() {
};
$ClientAPI_LampClient.prototype = {
	init: function(players, context) {
	},
	mouseMove: function(jQueryEvent) {
		return false;
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
