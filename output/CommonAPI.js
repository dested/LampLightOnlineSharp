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
	this.$1$PlayerNameField = null;
};
$CommonAPI_LampPlayer.prototype = {
	get_playerName: function() {
		return this.$1$PlayerNameField;
	},
	set_playerName: function(value) {
		this.$1$PlayerNameField = value;
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
Type.registerClass(global, 'CommonAPI.LampPlayer', $CommonAPI_LampPlayer, Object);
Type.registerClass(global, 'CommonAPI.LampPlayerMessage', $CommonAPI_LampPlayerMessage, Object);
Type.registerClass(global, 'CommonAPI.TaskHandler', $CommonAPI_TaskHandler, Object);
