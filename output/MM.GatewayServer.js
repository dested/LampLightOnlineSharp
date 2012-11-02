require('mscorlib');
var http = require('http');
var socketio = require('socket.io');
////////////////////////////////////////////////////////////////////////////////
// MM.GatewayServer.GatewayServer
var $MM_GatewayServer_GatewayServer = function() {
	this.users = {};
	var app = http.createServer(function(req, res) {
		res.end();
	});
	var io = socketio.listen(app);
	var port = 1800 + (ss.Int32.trunc(Math.random() * 4000) | 0);
	app.listen(port);
	io.set('log level', 1);
	var myName = 'Gateway ' + CommonLibraries.Guid.newGuid();
	io.sockets.on('connection', Function.mkdel(this, function(socket) {
		var user = null;
		socket.on('Gateway.Message', function(data) {
		});
		socket.on('Gateway.Login', Function.mkdel(this, function(data1) {
			user = new CommonShuffleLibrary.UserModel();
			user.set_socket(socket);
			user.set_userName(data1.userName);
			this.users[data1.userName] = user;
		}));
		socket.on('disconnect', Function.mkdel(this, function(data2) {
			delete this.users[user.get_userName()];
		}));
	}));
};
$MM_GatewayServer_GatewayServer.prototype = {
	$messageReceived: function(gateway, user, eventChannel, content) {
		if (Object.keyExists(this.users, user.get_userName())) {
			var u = this.users[user.get_userName()];
			u.get_socket().emit('Client.Message', new Models.SocketClientMessageModel(user, eventChannel, content));
		}
	}
};
$MM_GatewayServer_GatewayServer.$main = function() {
	new $MM_GatewayServer_GatewayServer();
};
Type.registerClass(global, 'MM.GatewayServer.GatewayServer', $MM_GatewayServer_GatewayServer, Object);
$MM_GatewayServer_GatewayServer.$main();
