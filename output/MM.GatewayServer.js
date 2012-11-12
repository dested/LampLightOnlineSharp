require('./mscorlib.debug.js');
require('./CommonAPI.js');
require('./ServerAPI.js');
require('./CommonLibraries.js');
require('./CommonServerLibraries.js');
require('./MMServerAPI.js');
require('./MMServer.js');
require('./Games/ZombieGame/ZombieGame.Common.js');
require('./Games/ZombieGame/ZombieGame.Server.js');
require('./Models.js');

var http = require('http');
var socketio = require('socket.io');
////////////////////////////////////////////////////////////////////////////////
// Messages.GatewayMessageType
var $Messages_GatewayMessageType = function() {
};
$Messages_GatewayMessageType.prototype = {};
Type.registerEnum(global, 'Messages.GatewayMessageType', $Messages_GatewayMessageType, false);
////////////////////////////////////////////////////////////////////////////////
// Messages.MessageMaker
var $Messages_MessageMaker = function() {
};
$Messages_MessageMaker.make = function(m) {
	var sb = '';
	for (var $t1 = 0; $t1 < m.length; $t1++) {
		var enum1 = m[$t1];
		sb += enum1 + $Messages_MessageMaker.$delimeter;
	}
	return sb;
};
////////////////////////////////////////////////////////////////////////////////
// Messages.TopLevelMessageType
var $Messages_TopLevelMessageType = function() {
};
$Messages_TopLevelMessageType.prototype = {};
Type.registerEnum(global, 'Messages.TopLevelMessageType', $Messages_TopLevelMessageType, false);
////////////////////////////////////////////////////////////////////////////////
// MM.GatewayServer.GatewayServer
var $MM_GatewayServer_GatewayServer = function(region) {
	this.$myName = null;
	this.$port = 0;
	this.$ps = null;
	this.$queueManager = null;
	this.users = {};
	this.region = 0;
	this.region = region;
	var app = http.createServer(function(req, res) {
		res.end();
	});
	var io = socketio.listen(app);
	this.$port = 1800 + (ss.Int32.trunc(Math.random() * 4000) | 0);
	app.listen(this.$port);
	io.set('log level', 1);
	this.$myName = 'Gateway ' + CommonLibraries.Guid.newGuid();
	this.$ps = new CommonServerLibraries.Queue.PubSub(Function.mkdel(this, this.$pubSubReady));
	this.$queueManager = new CommonServerLibraries.Queue.QueueManager(this.$myName);
	this.$queueManager.addWatcher(new CommonServerLibraries.Queue.QueueWatcher('GatewayServer', Function.mkdel(this, this.$messageReceived)));
	this.$queueManager.addWatcher(new CommonServerLibraries.Queue.QueueWatcher(this.$myName, Function.mkdel(this, this.$messageReceived)));
	this.$queueManager.addPusher(new CommonServerLibraries.Queue.QueuePusher('GameServer*'));
	this.$queueManager.addPusher(new CommonServerLibraries.Queue.QueuePusher('HeadServer'));
	io.sockets.on('connection', Function.mkdel(this, this.$userJoin));
};
$MM_GatewayServer_GatewayServer.prototype = {
	$pubSubReady: function() {
		this.$ps.subscribe('PUBSUB.GatewayServers.Ping', Function.mkdel(this, function(message) {
			this.$ps.publish('PUBSUB.GatewayServers', String.format('http://{0}:{1}', CommonServerLibraries.IPs.get_gatewayIP(), this.$port));
		}));
		this.$ps.publish('PUBSUB.GatewayServers', String.format('http://{0}:{1}', CommonServerLibraries.IPs.get_gatewayIP(), this.$port));
	},
	$userJoin: function(socket) {
		var user = null;
		socket.on('Gateway.Message', Function.mkdel(this, function(data) {
			if (ss.isNullOrUndefined(user)) {
				console.log('no user found:   ' + CommonLibraries.Extensions.stringify(data));
				return;
			}
			var channel = 'Bad';
			switch (data.channel.split(String.fromCharCode(46))[1]) {
				case 'Game': {
					channel = user.gameServer;
					break;
				}
				case 'Chat': {
					channel = ss.coalesce(user.chatServer, 'ChatServer');
					break;
				}
			}
			this.$queueManager.sendMessage$1(user, channel, data.content);
		}));
		socket.on('Gateway.Login', Function.mkdel(this, function(data1) {
			user = CommonLibraries.GatewayUserModel.$ctor();
			user.socket = socket;
			user.userName = data1.userName;
			this.users[data1.userName] = user;
			this.$queueManager.sendMessage$1(user, 'GameServer', new CommonAPI.PlayerJoinMessage());
		}));
		socket.on('disconnect', Function.mkdel(this, function(data2) {
			delete this.users[user.userName];
		}));
	},
	$messageReceived: function(gatewayName, user, content) {
		if (Object.keyExists(this.users, user.userName)) {
			var u = this.users[user.userName];
			if (content.get_channel() === 'GameServer.Accept') {
				//if the gamserver has accepted the player, tell him he has joined
				var message = Type.cast(content, CommonAPI.GameServerAcceptMessage);
				u.gameServer = message.get_gameServer();
				var socketClientMessageModel = new CommonLibraries.SocketClientMessageModel(user, 'GameServer.Joined', null);
				u.socket.emit('Client.Message', socketClientMessageModel);
			}
			else {
				//otherwise this is a normal message, just forward it along. 
				var socketClientMessageModel1 = new CommonLibraries.SocketClientMessageModel(user, content.get_channel(), content);
				u.socket.emit('Client.Message', socketClientMessageModel1);
			}
		}
		else {
			throw new ss.Exception(String.format('client {0} no found so failure', user.userName));
		}
	}
};
$MM_GatewayServer_GatewayServer.$main = function() {
	var region = 1;
	new $MM_GatewayServer_GatewayServer(region);
};
Type.registerClass(global, 'Messages.MessageMaker', $Messages_MessageMaker, Object);
Type.registerClass(global, 'MM.GatewayServer.GatewayServer', $MM_GatewayServer_GatewayServer, Object);
$Messages_MessageMaker.$delimeter = '.';
$MM_GatewayServer_GatewayServer.$main();
