////////////////////////////////////////////////////////////////////////////////
// CommonAPI.ChannelListenTriggerMessage
var $CommonAPI_ChannelListenTriggerMessage = function() {
};
$CommonAPI_ChannelListenTriggerMessage.createInstance = function() {
	return $CommonAPI_ChannelListenTriggerMessage.$ctor();
};
$CommonAPI_ChannelListenTriggerMessage.$ctor = function() {
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
// CommonAPI.LampPlayer
var $CommonAPI_LampPlayer = function() {
};
$CommonAPI_LampPlayer.createInstance = function() {
	return $CommonAPI_LampPlayer.$ctor();
};
$CommonAPI_LampPlayer.$ctor = function() {
	var $this = $CommonAPI_UserModel.$ctor();
	$this.playerName = null;
	return $this;
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
Type.registerClass(global, 'CommonAPI.ChannelListenTriggerMessage', $CommonAPI_ChannelListenTriggerMessage, Object);
Type.registerClass(global, 'CommonAPI.LampPlayerMessage', $CommonAPI_LampPlayerMessage, Object);
Type.registerClass(global, 'CommonAPI.TaskHandler', $CommonAPI_TaskHandler, Object);
Type.registerClass(global, 'CommonAPI.UserModel', $CommonAPI_UserModel, Object);
Type.registerClass(global, 'CommonAPI.LampPlayer', $CommonAPI_LampPlayer);
