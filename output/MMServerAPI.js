////////////////////////////////////////////////////////////////////////////////
// MMServerAPI.LampServer
var $MMServerAPI_LampServer = function() {
	this.$1$ReceiveMessageField = null;
};
$MMServerAPI_LampServer.prototype = {
	init: function(players) {
	},
	sendMessageToPlayer: function(player) {
	},
	sendMessageToPlayers: function(player) {
	},
	get_receiveMessage: function() {
		return this.$1$ReceiveMessageField;
	},
	set_receiveMessage: function(value) {
		this.$1$ReceiveMessageField = value;
	},
	tick: function() {
	}
};
Type.registerClass(global, 'MMServerAPI.LampServer', $MMServerAPI_LampServer, Object);
