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
// TowerD.Common.SudokuPlayer
var $TowerD_Common_SudokuPlayer = function() {
	this.numberSet = null;
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Common.SudokuPlayerMessage
var $TowerD_Common_SudokuPlayerMessage = function() {
	this.messageType = 0;
	this.messageInfo = null;
};
$TowerD_Common_SudokuPlayerMessage.prototype = {
	getMessageInfo: function(T) {
		return function() {
			return Type.cast(this.messageInfo, T);
		};
	}
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Common.SudokuPlayerMessageType
var $TowerD_Common_SudokuPlayerMessageType = function() {
};
$TowerD_Common_SudokuPlayerMessageType.prototype = { newNumber: 0 };
Type.registerEnum(global, 'TowerD.Common.SudokuPlayerMessageType', $TowerD_Common_SudokuPlayerMessageType, false);
////////////////////////////////////////////////////////////////////////////////
// TowerD.Common.SudokuPlayerNewNumberMessage
var $TowerD_Common_SudokuPlayerNewNumberMessage = function() {
};
$TowerD_Common_SudokuPlayerNewNumberMessage.createInstance = function() {
	return $TowerD_Common_SudokuPlayerNewNumberMessage.$ctor();
};
$TowerD_Common_SudokuPlayerNewNumberMessage.$ctor = function() {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.number = 0;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Common.SudokuServerMessageType
var $TowerD_Common_SudokuServerMessageType = function() {
};
$TowerD_Common_SudokuServerMessageType.prototype = { updateNumber: 0 };
Type.registerEnum(global, 'TowerD.Common.SudokuServerMessageType', $TowerD_Common_SudokuServerMessageType, false);
////////////////////////////////////////////////////////////////////////////////
// TowerD.Common.SudokuServerUpdateNumber
var $TowerD_Common_SudokuServerUpdateNumber = function(player, x, y) {
	this.$1$PlayerField = null;
	this.$1$XField = 0;
	this.$1$YField = 0;
	this.set_player(player);
	this.set_x(x);
	this.set_y(y);
};
$TowerD_Common_SudokuServerUpdateNumber.prototype = {
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
Type.registerClass(global, 'SudokuCommon.SudokuServerMessage', $SudokuCommon_SudokuServerMessage, Object);
Type.registerClass(global, 'TowerD.Common.SudokuPlayer', $TowerD_Common_SudokuPlayer, Object);
Type.registerClass(global, 'TowerD.Common.SudokuPlayerMessage', $TowerD_Common_SudokuPlayerMessage, Object);
Type.registerClass(global, 'TowerD.Common.SudokuPlayerNewNumberMessage', $TowerD_Common_SudokuPlayerNewNumberMessage, Object);
Type.registerClass(global, 'TowerD.Common.SudokuServerUpdateNumber', $TowerD_Common_SudokuServerUpdateNumber, Object);
