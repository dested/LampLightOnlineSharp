
// CommonAPI.ChannelMessage
var $CommonAPI_ChannelMessage = function() {
};
$CommonAPI_ChannelMessage.prototype = { get_channel: null, get_gatewayChannel: null };
////////////////////////////////////////////////////////////////////////////////
// CommonAPI.DataObject
var $CommonAPI_DataObject$1 = function(T) {
	var $type = function(data) {
		this.Data = T.getDefaultValue();
		this.Data = data;
	};
	Type.registerGenericClassInstance($type, $CommonAPI_DataObject$1, [T], function() {
		return Object;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'CommonAPI.DataObject$1', $CommonAPI_DataObject$1, 1);
////////////////////////////////////////////////////////////////////////////////
// CommonAPI.GameServerAcceptMessage
var $CommonAPI_GameServerAcceptMessage = function() {
	this.$2$GameServerField = null;
	$CommonAPI_ChannelMessage.call(this);
};
$CommonAPI_GameServerAcceptMessage.prototype = {
	get_gameServer: function() {
		return this.$2$GameServerField;
	},
	set_gameServer: function(value) {
		this.$2$GameServerField = value;
	},
	get_channel: function() {
		return 'GameServer.Accept';
	},
	get_gatewayChannel: function() {
		return 'Game';
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonAPI.LampAction
var $CommonAPI_LampAction = function() {
	this.$3$TickToInitiateField = 0;
	$CommonAPI_LampMessage.call(this);
};
$CommonAPI_LampAction.prototype = {
	get_tickToInitiate: function() {
		return this.$3$TickToInitiateField;
	},
	set_tickToInitiate: function(value) {
		this.$3$TickToInitiateField = value;
	},
	get_type: function() {
		return 0;
	},
	get_gatewayChannel: function() {
		return 'Game';
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonAPI.LampActionProduct
var $CommonAPI_LampActionProduct = function() {
	$CommonAPI_LampMessage.call(this);
};
$CommonAPI_LampActionProduct.prototype = {
	get_type: function() {
		return 1;
	},
	get_gatewayChannel: function() {
		return 'Game';
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonAPI.LampMessage
var $CommonAPI_LampMessage = function() {
	this.user = null;
	$CommonAPI_ChannelMessage.call(this);
};
$CommonAPI_LampMessage.prototype = { get_type: null };
////////////////////////////////////////////////////////////////////////////////
// CommonAPI.LampMessageType
var $CommonAPI_LampMessageType = function() {
};
$CommonAPI_LampMessageType.prototype = { action: 0, product: 1 };
Type.registerEnum(global, 'CommonAPI.LampMessageType', $CommonAPI_LampMessageType, false);
////////////////////////////////////////////////////////////////////////////////
// CommonAPI.LampPlayer
var $CommonAPI_LampPlayer = function() {
};
$CommonAPI_LampPlayer.$ctor = function(user) {
	var $this = $CommonAPI_UserModel.$ctor();
	$this.playerName = null;
	$this.gateway = user.gateway;
	$this.userName = user.userName;
	$this.playerName = $this.userName;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// CommonAPI.PlayerJoinMessage
var $CommonAPI_PlayerJoinMessage = function() {
	$CommonAPI_ChannelMessage.call(this);
};
$CommonAPI_PlayerJoinMessage.prototype = {
	get_channel: function() {
		return $CommonAPI_PlayerJoinMessage.messageChannel;
	},
	get_gatewayChannel: function() {
		return 'Game';
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonAPI.TaskHandler
var $CommonAPI_TaskHandler = function() {
	this.$current = 0;
	this.$1$TasksField = null;
	this.set_tasks([]);
};
$CommonAPI_TaskHandler.prototype = {
	get_tasks: function() {
		return this.$1$TasksField;
	},
	set_tasks: function(value) {
		this.$1$TasksField = value;
	},
	addTask: function(task) {
		this.get_tasks().add(task);
		return this;
	},
	do: function() {
		this.get_tasks()[this.$current++](Function.mkdel(this, this.happen));
	},
	happen: function() {
		if (this.$current === this.get_tasks().length) {
			return;
		}
		this.get_tasks()[this.$current++](Function.mkdel(this, this.happen));
	}
};
$CommonAPI_TaskHandler.start = function(task) {
	return (new $CommonAPI_TaskHandler()).addTask(task);
};
////////////////////////////////////////////////////////////////////////////////
// CommonAPI.UserModel
var $CommonAPI_UserModel = function() {
};
$CommonAPI_UserModel.createInstance = function() {
	return $CommonAPI_UserModel.$ctor();
};
$CommonAPI_UserModel.$ctor = function() {
	var $this = {};
	$this.gateway = null;
	$this.userName = null;
	return $this;
};
Type.registerClass(global, 'CommonAPI.ChannelMessage', $CommonAPI_ChannelMessage, Object);
Type.registerClass(global, 'CommonAPI.GameServerAcceptMessage', $CommonAPI_GameServerAcceptMessage, $CommonAPI_ChannelMessage);
Type.registerClass(global, 'CommonAPI.LampMessage', $CommonAPI_LampMessage, $CommonAPI_ChannelMessage);
Type.registerClass(global, 'CommonAPI.PlayerJoinMessage', $CommonAPI_PlayerJoinMessage, $CommonAPI_ChannelMessage);
Type.registerClass(global, 'CommonAPI.TaskHandler', $CommonAPI_TaskHandler, Object);
Type.registerClass(global, 'CommonAPI.UserModel', $CommonAPI_UserModel, Object);
Type.registerClass(global, 'CommonAPI.LampAction', $CommonAPI_LampAction, $CommonAPI_LampMessage);
Type.registerClass(global, 'CommonAPI.LampActionProduct', $CommonAPI_LampActionProduct, $CommonAPI_LampMessage);
Type.registerClass(global, 'CommonAPI.LampPlayer', $CommonAPI_LampPlayer);
$CommonAPI_PlayerJoinMessage.messageChannel = 'Player.Join';
