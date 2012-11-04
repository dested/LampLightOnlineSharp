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
	var $this = {};
	$this.player = null;
	$this.type = 0;
	$this.message = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// MMServerAPI.LampServer
var $MMServerAPI_LampServer = function() {
	this.$1$ActionsField = null;
	this.$1$TickIndexField = 0;
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
	init: function(players) {
	},
	sendMessageToPlayer: function(player) {
	},
	sendMessageToPlayers: function(player) {
	},
	receiveMessage: function(message) {
		switch (message.type) {
			case 0: {
				var lampAction = message;
				var lampActions = this.get_actions()[lampAction.tickToInitiate];
				if (ss.isNullOrUndefined(lampActions)) {
					this.get_actions()[lampAction.tickToInitiate] = lampActions = [];
				}
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
		for (var $t3 = 0; $t3 < acts.length; $t3++) {
			var lampAction = acts[$t3];
			this.executeAction(lampAction);
		}
		delete this.get_actions()[this.get_tickIndex() - 1];
	},
	gameTick: function() {
	}
};
Type.registerClass(global, 'MMServerAPI.LampMessage', $MMServerAPI_LampMessage, Object);
Type.registerClass(global, 'MMServerAPI.LampPlayerMessage', $MMServerAPI_LampPlayerMessage, Object);
Type.registerClass(global, 'MMServerAPI.LampServer', $MMServerAPI_LampServer, Object);
Type.registerClass(global, 'MMServerAPI.LampAction', $MMServerAPI_LampAction);
