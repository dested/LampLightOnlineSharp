
// ServerAPI.LampServer
var $ServerAPI_LampServer = function() {
	this.$1$ReceiveMessageField = null;
};
$ServerAPI_LampServer.prototype = {
	get_receiveMessage: function() {
		return this.$1$ReceiveMessageField;
	},
	set_receiveMessage: function(value) {
		this.$1$ReceiveMessageField = value;
	},
	init: function(players) {
	},
	sendMessageToPlayer: function(player) {
	},
	sendMessageToPlayers: function(player) {
	}
};
Type.registerClass(global, 'ServerAPI.LampServer', $ServerAPI_LampServer, Object);
