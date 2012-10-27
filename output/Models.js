////////////////////////////////////////////////////////////////////////////////
// Models.GatewayLoginMessageModel
var $Models_GatewayLoginMessageModel = function() {
};
$Models_GatewayLoginMessageModel.createInstance = function() {
	return $Models_GatewayLoginMessageModel.$ctor();
};
$Models_GatewayLoginMessageModel.$ctor = function() {
	var $this = {};
	$this.userName = null;
	$this.password = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Models.GatewayMessageModel
var $Models_GatewayMessageModel = function() {
};
$Models_GatewayMessageModel.$ctor = function(channel, content, gameServer) {
	var $this = {};
	$this.channel = null;
	$this.content = null;
	$this.gameServer = null;
	$this.channel = channel;
	$this.content = content;
	$this.gameServer = gameServer;
	return $this;
};
Type.registerClass(global, 'Models.GatewayLoginMessageModel', $Models_GatewayLoginMessageModel, Object);
Type.registerClass(global, 'Models.GatewayMessageModel', $Models_GatewayMessageModel, Object);
