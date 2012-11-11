////////////////////////////////////////////////////////////////////////////////
// MMServerAPI.LampAction
var $MMServerAPI_LampAction = function() {
};
$MMServerAPI_LampAction.createInstance = function() {
	return $MMServerAPI_LampAction.$ctor();
};
$MMServerAPI_LampAction.$ctor = function() {
	var $this = $MMServerAPI_LampPlayerMessage.$ctor();
	$this.tickToInitiate = 0;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// MMServerAPI.LampMessage
var $MMServerAPI_LampMessage = function() {
};
////////////////////////////////////////////////////////////////////////////////
// MMServerAPI.LampMessageType
var $MMServerAPI_LampMessageType = function() {
};
$MMServerAPI_LampMessageType.prototype = { action: 0 };
Type.registerEnum(global, 'MMServerAPI.LampMessageType', $MMServerAPI_LampMessageType, false);
////////////////////////////////////////////////////////////////////////////////
// MMServerAPI.LampPlayerMessage
var $MMServerAPI_LampPlayerMessage = function() {
};
$MMServerAPI_LampPlayerMessage.createInstance = function() {
	return $MMServerAPI_LampPlayerMessage.$ctor();
};
$MMServerAPI_LampPlayerMessage.$ctor = function() {
	var $this = CommonAPI.ChannelListenTriggerMessage.$ctor();
	$this.player = null;
	$this.type = 0;
	$this.message = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// MMServerAPI.LampServer
var $MMServerAPI_LampServer = function(manager) {
	this.myManager = null;
	this.$1$ActionsField = null;
	this.$1$TickIndexField = 0;
	this.$1$PlayersField = null;
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
		this.myManager.serverManager.emit(player, message);
	},
	sendMessageToPlayers: function(message, players) {
		this.myManager.serverManager.emitAll(players, message);
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
	executeAction: function(action) {
	},
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
	gameTick: function() {
	},
	end: function() {
	}
};
////////////////////////////////////////////////////////////////////////////////
// MMServerAPI.ServerGameManager
var $MMServerAPI_ServerGameManager = function(region, serverManager) {
	this.$myGame = null;
	this.region = 0;
	this.serverManager = null;
	this.region = region;
	this.serverManager = serverManager;
};
$MMServerAPI_ServerGameManager.prototype = {
	tick: function() {
		this.$myGame.tick();
	},
	start: function(game) {
		this.$myGame = game;
		this.$myGame.init();
	},
	end: function() {
		this.$myGame.end();
	}
};
Type.registerClass(global, 'MMServerAPI.LampMessage', $MMServerAPI_LampMessage, Object);
Type.registerClass(global, 'MMServerAPI.LampPlayerMessage', $MMServerAPI_LampPlayerMessage);
Type.registerClass(global, 'MMServerAPI.LampServer', $MMServerAPI_LampServer, Object);
Type.registerClass(global, 'MMServerAPI.ServerGameManager', $MMServerAPI_ServerGameManager, Object);
Type.registerClass(global, 'MMServerAPI.LampAction', $MMServerAPI_LampAction);
