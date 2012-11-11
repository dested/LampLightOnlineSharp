
// CommonAPI.ChannelListenTriggerMessage
var $CommonAPI_ChannelListenTriggerMessage = function() {
};
$CommonAPI_ChannelListenTriggerMessage.createInstance = function() {
	return $CommonAPI_ChannelListenTriggerMessage.$ctor();
};
$CommonAPI_ChannelListenTriggerMessage.$ctor = function() {
	var $this = {};
	$this.channel = null;
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
// CommonAPI.GameServerCapabilities
var $CommonAPI_GameServerCapabilities = function() {
};
$CommonAPI_GameServerCapabilities.createInstance = function() {
	return $CommonAPI_GameServerCapabilities.$ctor();
};
$CommonAPI_GameServerCapabilities.$ctor = function() {
	var $this = {};
	$this.listenOnChannel = null;
	$this.emit = null;
	$this.emitAll = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// CommonAPI.IServerManager
var $CommonAPI_IServerManager = function() {
};
$CommonAPI_IServerManager.prototype = { listenOnChannel: null, emit: null, emitAll: null, init: null, end: null };
////////////////////////////////////////////////////////////////////////////////
// CommonAPI.LampPlayer
var $CommonAPI_LampPlayer = function() {
	this.$2$PlayerNameField = null;
	$CommonAPI_UserModel.call(this);
};
$CommonAPI_LampPlayer.prototype = {
	get_playerName: function() {
		return this.$2$PlayerNameField;
	},
	set_playerName: function(value) {
		this.$2$PlayerNameField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonAPI.LampPlayerMessage
var $CommonAPI_LampPlayerMessage = function() {
	this.player = null;
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
	this.$1$GatewayField = null;
	this.$1$UserNameField = null;
};
$CommonAPI_UserModel.prototype = {
	get_gateway: function() {
		return this.$1$GatewayField;
	},
	set_gateway: function(value) {
		this.$1$GatewayField = value;
	},
	get_userName: function() {
		return this.$1$UserNameField;
	},
	set_userName: function(value) {
		this.$1$UserNameField = value;
	}
};
Type.registerClass(global, 'CommonAPI.ChannelListenTriggerMessage', $CommonAPI_ChannelListenTriggerMessage, Object);
Type.registerClass(global, 'CommonAPI.GameServerCapabilities', $CommonAPI_GameServerCapabilities, Object);
Type.registerInterface(global, 'CommonAPI.IServerManager', $CommonAPI_IServerManager, []);
Type.registerClass(global, 'CommonAPI.LampPlayerMessage', $CommonAPI_LampPlayerMessage, Object);
Type.registerClass(global, 'CommonAPI.TaskHandler', $CommonAPI_TaskHandler, Object);
Type.registerClass(global, 'CommonAPI.UserModel', $CommonAPI_UserModel, Object);
Type.registerClass(global, 'CommonAPI.LampPlayer', $CommonAPI_LampPlayer, $CommonAPI_UserModel);
