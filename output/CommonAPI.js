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
// CommonAPI.DelegateOrValue
var $CommonAPI_DelegateOrValue$1 = function(T) {
	var $type = function(d) {
		this.isValue = false;
		this.$method = null;
		this.$value = T.getDefaultValue();
		this.$method = d;
		this.isValue = false;
	};
	$type.prototype = {
		$evaluate: function() {
			if (this.isValue === true) {
				return this.$value;
			}
			else if (this.isValue === false) {
				return this.$method();
			}
			return T.getDefaultValue();
		}
	};
	$type.$ctor1 = function(d) {
		this.isValue = false;
		this.$method = null;
		this.$value = T.getDefaultValue();
		this.$value = d;
		this.isValue = true;
	};
	$type.$ctor1.prototype = $type.prototype;
	$type.op_Implicit$2 = function(d) {
		return new (Type.makeGenericType($CommonAPI_DelegateOrValue$1, [T]).$ctor1)(d);
	};
	$type.op_Implicit$1 = function(d) {
		return new (Type.makeGenericType($CommonAPI_DelegateOrValue$1, [T]))(d);
	};
	$type.op_Implicit = function(d) {
		return d.$evaluate();
	};
	Type.registerGenericClassInstance($type, $CommonAPI_DelegateOrValue$1, [T], function() {
		return Object;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'CommonAPI.DelegateOrValue$1', $CommonAPI_DelegateOrValue$1, 1);
////////////////////////////////////////////////////////////////////////////////
// CommonAPI.LampPlayer
var $CommonAPI_LampPlayer = function() {
	this.onMessageRecieved = null;
	this.playerName = null;
};
$CommonAPI_LampPlayer.prototype = {
	sendMessage: function(T) {
		return function(sudokuServerMessage) {
		};
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonAPI.LampPlayerMessage
var $CommonAPI_LampPlayerMessage = function() {
	this.player = null;
};
////////////////////////////////////////////////////////////////////////////////
// CommonAPI.LampPlayerMessageReceived
var $CommonAPI_LampPlayerMessageReceived = function() {
	this.data = null;
	$CommonAPI_LampPlayerMessage.call(this);
};
$CommonAPI_LampPlayerMessageReceived.prototype = {
	getData: function(T) {
		return function() {
			return Type.cast(this.data, T);
		};
	}
};
Type.registerClass(global, 'CommonAPI.LampPlayer', $CommonAPI_LampPlayer, Object);
Type.registerClass(global, 'CommonAPI.LampPlayerMessage', $CommonAPI_LampPlayerMessage, Object);
Type.registerClass(global, 'CommonAPI.LampPlayerMessageReceived', $CommonAPI_LampPlayerMessageReceived, $CommonAPI_LampPlayerMessage);
