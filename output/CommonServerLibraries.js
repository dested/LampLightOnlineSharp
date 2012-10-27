////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibrary.Consumer
var $CommonShuffleLibrary_Consumer = function(obj) {
	var tf = this;
	var $t1 = Object.keys(obj).getEnumerator();
	try {
		while ($t1.moveNext()) {
			var v = $t1.get_current();
			tf[v] = obj[v];
		}
	}
	finally {
		$t1.dispose();
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibrary.IPs
var $CommonShuffleLibrary_IPs = function() {
};
$CommonShuffleLibrary_IPs.get_gatewayIP = function() {
	return '50.116.28.16';
};
$CommonShuffleLibrary_IPs.get_redisIP = function() {
	return '50.116.28.16';
};
////////////////////////////////////////////////////////////////////////////////
// CommonShuffleLibrary.UserModel
var $CommonShuffleLibrary_UserModel = function() {
	this.$1$GatewayField = null;
	this.$1$UserNameField = null;
	this.$1$SocketField = null;
};
$CommonShuffleLibrary_UserModel.prototype = {
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
	},
	get_socket: function() {
		return this.$1$SocketField;
	},
	set_socket: function(value) {
		this.$1$SocketField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// Models.SocketClientMessageModel
var $Models_SocketClientMessageModel = function(user, channel, content) {
	this.channel = null;
	this.content = null;
	this.user = null;
	this.user = user;
	this.channel = channel;
	this.content = content;
};
Type.registerClass(global, 'CommonShuffleLibrary.Consumer', $CommonShuffleLibrary_Consumer, Object);
Type.registerClass(global, 'CommonShuffleLibrary.IPs', $CommonShuffleLibrary_IPs, Object);
Type.registerClass(global, 'CommonShuffleLibrary.UserModel', $CommonShuffleLibrary_UserModel, Object);
Type.registerClass(global, 'Models.SocketClientMessageModel', $Models_SocketClientMessageModel, Object);
