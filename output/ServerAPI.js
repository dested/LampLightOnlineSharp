
// ServerAPI.LampServer
var $ServerAPI_LampServer = function() {
	this.$1$ReceiveMessageField = null;
};
$ServerAPI_LampServer.prototype = {
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
	}
};
Type.registerClass(global, 'ServerAPI.LampServer', $ServerAPI_LampServer, Object);
