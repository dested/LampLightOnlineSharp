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
