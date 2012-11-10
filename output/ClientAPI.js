
// ClientAPI.LampClient
var $ClientAPI_LampClient = function() {
	this.receiveChannelMessage = null;
	this.sendChannelMessage = null;
	this.screen = null;
	this.$1$PlayersField = null;
};
$ClientAPI_LampClient.prototype = {
	get_players: function() {
		return this.$1$PlayersField;
	},
	set_players: function(value) {
		this.$1$PlayersField = value;
	},
	init: function(players, context) {
		this.set_players(players);
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
