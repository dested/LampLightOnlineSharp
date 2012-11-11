require('mscorlib');
var http = require('http');
var socketio = require('socket.io');
////////////////////////////////////////////////////////////////////////////////
// GatewayServer.GatewayServer
var $GatewayServer_GatewayServer = function() {
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
			user = CommonLibraries.GatewayUserModel.$ctor();
			user.socket = socket;
			user.userName = data1.userName;
			this.users[data1.userName] = user;
			socket.emit('Area.Main.Login.Response', 'hi! ' + data1.userName);
		}));
		socket.on('disconnect', Function.mkdel(this, function(data2) {
			delete this.users[user.userName];
		}));
	}));
};
$GatewayServer_GatewayServer.prototype = {
	$messageReceived: function(gateway, user, eventChannel, content) {
		if (Object.keyExists(this.users, user.userName)) {
			var u = this.users[user.userName];
			u.socket.emit('Client.Message', new CommonLibraries.SocketClientMessageModel(user, eventChannel, content));
		}
	}
};
$GatewayServer_GatewayServer.$main = function() {
	new $GatewayServer_GatewayServer();
};
Type.registerClass(global, 'GatewayServer.GatewayServer', $GatewayServer_GatewayServer, Object);
$GatewayServer_GatewayServer.$main();
