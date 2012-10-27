////////////////////////////////////////////////////////////////////////////////
// SudokuCommon.SudokuPlayer
var $SudokuCommon_SudokuPlayer = function() {
	this.numberSet = null;
};
////////////////////////////////////////////////////////////////////////////////
// SudokuCommon.SudokuPlayerMessage
var $SudokuCommon_SudokuPlayerMessage = function() {
	this.messageType = 0;
	this.messageInfo = null;
};
$SudokuCommon_SudokuPlayerMessage.prototype = {
	getMessageInfo: function(T) {
		return function() {
			return Type.cast(this.messageInfo, T);
		};
	}
};
////////////////////////////////////////////////////////////////////////////////
// SudokuCommon.SudokuPlayerMessageType
var $SudokuCommon_SudokuPlayerMessageType = function() {
};
$SudokuCommon_SudokuPlayerMessageType.prototype = { newNumber: 0 };
Type.registerEnum(global, 'SudokuCommon.SudokuPlayerMessageType', $SudokuCommon_SudokuPlayerMessageType, false);
////////////////////////////////////////////////////////////////////////////////
// SudokuCommon.SudokuPlayerNewNumberMessage
var $SudokuCommon_SudokuPlayerNewNumberMessage = function() {
};
$SudokuCommon_SudokuPlayerNewNumberMessage.createInstance = function() {
	return $SudokuCommon_SudokuPlayerNewNumberMessage.$ctor();
};
$SudokuCommon_SudokuPlayerNewNumberMessage.$ctor = function() {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.number = 0;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// SudokuCommon.SudokuServerMessage
var $SudokuCommon_SudokuServerMessage = function(messageInfo) {
	this.messageType = 0;
	this.messageInfo = null;
	this.messageInfo = messageInfo;
	this.messageType = 0;
};
$SudokuCommon_SudokuServerMessage.prototype = {
	getMessageInfo: function(T) {
		return function() {
			return Type.cast(this.messageInfo, T);
		};
	}
};
////////////////////////////////////////////////////////////////////////////////
// SudokuCommon.SudokuServerMessageType
var $SudokuCommon_SudokuServerMessageType = function() {
};
$SudokuCommon_SudokuServerMessageType.prototype = { updateNumber: 0 };
Type.registerEnum(global, 'SudokuCommon.SudokuServerMessageType', $SudokuCommon_SudokuServerMessageType, false);
////////////////////////////////////////////////////////////////////////////////
// SudokuCommon.SudokuServerUpdateNumber
var $SudokuCommon_SudokuServerUpdateNumber = function(player, x, y) {
	this.$1$PlayerField = null;
	this.$1$XField = 0;
	this.$1$YField = 0;
	this.set_player(player);
	this.set_x(x);
	this.set_y(y);
};
$SudokuCommon_SudokuServerUpdateNumber.prototype = {
	get_player: function() {
		return this.$1$PlayerField;
	},
	set_player: function(value) {
		this.$1$PlayerField = value;
	},
	get_x: function() {
		return this.$1$XField;
	},
	set_x: function(value) {
		this.$1$XField = value;
	},
	get_y: function() {
		return this.$1$YField;
	},
	set_y: function(value) {
		this.$1$YField = value;
	}
};
Type.registerClass(global, 'SudokuCommon.SudokuPlayer', $SudokuCommon_SudokuPlayer, Object);
Type.registerClass(global, 'SudokuCommon.SudokuPlayerMessage', $SudokuCommon_SudokuPlayerMessage, Object);
Type.registerClass(global, 'SudokuCommon.SudokuPlayerNewNumberMessage', $SudokuCommon_SudokuPlayerNewNumberMessage, Object);
Type.registerClass(global, 'SudokuCommon.SudokuServerMessage', $SudokuCommon_SudokuServerMessage, Object);
Type.registerClass(global, 'SudokuCommon.SudokuServerUpdateNumber', $SudokuCommon_SudokuServerUpdateNumber, Object);
