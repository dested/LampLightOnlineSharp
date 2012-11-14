
// MMServerAPI.IServerManager
var $MMServerAPI_IServerManager = function() {
};
$MMServerAPI_IServerManager.prototype = { listenOnChannel: null, emit: null, emitAll: null, init: null, end: null };
////////////////////////////////////////////////////////////////////////////////
// MMServerAPI.LampServer
var $MMServerAPI_LampServer = function(region, manager) {
	this.myManager = null;
	this.$myRegion = 0;
	this.$1$ActionsField = null;
	this.$1$TickIndexField = 0;
	this.$1$PlayersField = null;
	this.$myRegion = region;
	this.myManager = manager;
	this.set_actions({});
};
$MMServerAPI_LampServer.prototype = {
	get_actions: function() {
		return this.$1$ActionsField;
	},
	set_actions: function(value) {
		this.$1$ActionsField = value;
	},
	get_tickIndex: function() {
		return this.$1$TickIndexField;
	},
	set_tickIndex: function(value) {
		this.$1$TickIndexField = value;
	},
	get_players: function() {
		return this.$1$PlayersField;
	},
	set_players: function(value) {
		this.$1$PlayersField = value;
	},
	init: function() {
		this.set_players([]);
	},
	sendMessageToPlayer: function(message, player) {
		this.myManager.emit(player, message);
	},
	sendMessageToPlayers: function(message, players) {
		this.myManager.emitAll(players, message);
	},
	receiveMessage: function(message) {
		switch (message.type) {
			case 0: {
				var lampAction = message;
				var lampActions = this.get_actions()[lampAction.tickToInitiate] = this.get_actions()[lampAction.tickToInitiate] || [];
				lampActions.add(lampAction);
				break;
			}
		}
	},
	executeAction: null,
	tick: function() {
		var $t2 = this.get_actions();
		var $t1 = this.get_tickIndex();
		this.set_tickIndex($t1 + 1);
		var acts = $t2[$t1];
		this.gameTick();
		if (ss.isValue(acts)) {
			for (var $t3 = 0; $t3 < acts.length; $t3++) {
				var lampAction = acts[$t3];
				this.executeAction(lampAction);
			}
		}
		delete this.get_actions()[this.get_tickIndex() - 1];
	},
	gameTick: null,
	end: null,
	makePlayerActive: null
};
Type.registerInterface(global, 'MMServerAPI.IServerManager', $MMServerAPI_IServerManager, []);
Type.registerClass(global, 'MMServerAPI.LampServer', $MMServerAPI_LampServer, Object);
