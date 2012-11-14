
// CommonAPI.ChannelMessage
var $CommonAPI_ChannelMessage = function() {
};
$CommonAPI_ChannelMessage.$ctor = function() {
	var $this = {};
	$this.channel = null;
	$this.gatewayChannel = null;
	return $this;
};
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
};
$CommonAPI_GameServerAcceptMessage.createInstance = function() {
	return $CommonAPI_GameServerAcceptMessage.$ctor();
};
$CommonAPI_GameServerAcceptMessage.$ctor = function() {
	var $this = $CommonAPI_ChannelMessage.$ctor();
	$this.gameServer = null;
	$this.channel = 'GameServer.Accept';
	$this.gatewayChannel = 'Game';
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// CommonAPI.LampAction
var $CommonAPI_LampAction = function() {
};
$CommonAPI_LampAction.$ctor = function() {
	var $this = $CommonAPI_LampMessage.$ctor();
	$this.tickToInitiate = 0;
	$this.gatewayChannel = 'Game';
	$this.type = 0;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// CommonAPI.LampActionProduct
var $CommonAPI_LampActionProduct = function() {
};
$CommonAPI_LampActionProduct.$ctor = function() {
	var $this = $CommonAPI_LampMessage.$ctor();
	$this.gatewayChannel = 'Game';
	$this.type = 1;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// CommonAPI.LampMessage
var $CommonAPI_LampMessage = function() {
};
$CommonAPI_LampMessage.$ctor = function() {
	var $this = $CommonAPI_ChannelMessage.$ctor();
	$this.type = 0;
	$this.user = null;
	return $this;
};
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
};
$CommonAPI_PlayerJoinMessage.createInstance = function() {
	return $CommonAPI_PlayerJoinMessage.$ctor();
};
$CommonAPI_PlayerJoinMessage.$ctor = function() {
	var $this = $CommonAPI_ChannelMessage.$ctor();
	$this.channel = $CommonAPI_PlayerJoinMessage.messageChannel;
	$this.gatewayChannel = 'Game';
	return $this;
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
Type.registerClass(global, 'CommonAPI.GameServerAcceptMessage', $CommonAPI_GameServerAcceptMessage);
Type.registerClass(global, 'CommonAPI.LampMessage', $CommonAPI_LampMessage);
Type.registerClass(global, 'CommonAPI.PlayerJoinMessage', $CommonAPI_PlayerJoinMessage);
Type.registerClass(global, 'CommonAPI.TaskHandler', $CommonAPI_TaskHandler, Object);
Type.registerClass(global, 'CommonAPI.UserModel', $CommonAPI_UserModel, Object);
Type.registerClass(global, 'CommonAPI.LampAction', $CommonAPI_LampAction);
Type.registerClass(global, 'CommonAPI.LampActionProduct', $CommonAPI_LampActionProduct);
Type.registerClass(global, 'CommonAPI.LampPlayer', $CommonAPI_LampPlayer);
$CommonAPI_PlayerJoinMessage.messageChannel = 'Player.Join';
