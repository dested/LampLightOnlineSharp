
// MMServer.ServerManager
var $MMServer_ServerManager = function(region, gameServerInfo) {
	this.$myGameServerInfo = null;
	this.$myRegion = 0;
	this.$myGame = null;
	this.$myRegion = region;
	this.$myGameServerInfo = gameServerInfo;
};
$MMServer_ServerManager.prototype = {
	init: function() {
		this.$myGameServerInfo.queueManager.addPusher(new CommonServerLibraries.Queue.QueuePusher('GameServerProducts'));
		this.$myGameServerInfo.queueManager.addPusher(new CommonServerLibraries.Queue.QueuePusher('Gateway*'));
		this.$myGameServerInfo.queueManager.addWatcher(new CommonServerLibraries.Queue.QueueWatcher('GameServer', Function.mkdel(this, this.$gameServerMessage)));
		this.$myGameServerInfo.queueManager.addWatcher(new CommonServerLibraries.Queue.QueueWatcher(this.$myGameServerInfo.gameServerName, Function.mkdel(this, this.$gameServerIndexMessage)));
		this.$myGameServerInfo.queueManager.addWatcher(new CommonServerLibraries.Queue.QueueWatcher('GameServerProducts', Function.mkdel(this, this.$gameServerProductMessage)));
		//probably some big game switch to determine which "Game" to run. 
		this.$myGame = new ZombieGame.Server.Game(this.$myRegion, this);
		this.$myGame.init();
		setInterval(Function.mkdel(this, this.$tick), 100);
		//needs to be incredibly high resolution. c++ lib
	},
	end: function() {
		this.$myGame.end();
	},
	listenOnChannel: function(channel, trigger) {
		this.$myGameServerInfo.queueManager.addChannel(channel, trigger);
	},
	emit: function(player, val) {
		this.$myGameServerInfo.queueManager.sendMessage$1(player, player.gateway, val);
	},
	emitAll: function(players, val) {
		var $t1 = players.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var player = $t1.get_current();
				this.$myGameServerInfo.queueManager.sendMessage$1(player, player.gateway, val);
			}
		}
		finally {
			$t1.dispose();
		}
	},
	$gameServerProductMessage: function(name, user, content) {
		var player = user;
	},
	$gameServerIndexMessage: function(name, user, content) {
		var message = Type.cast(content, CommonAPI.LampMessage);
		message.user = user;
		this.$myGame.receiveMessage(message);
	},
	$gameServerMessage: function(name, user, content) {
		switch (content.get_channel()) {
			case 'Player.Join': {
				var c = Type.cast(content, CommonAPI.PlayerJoinMessage);
				var lampPlayer = CommonAPI.LampPlayer.$ctor(user);
				this.$myGame.makePlayerActive(lampPlayer);
				var $t1 = new CommonAPI.GameServerAcceptMessage();
				$t1.set_gameServer(this.$myGameServerInfo.gameServerName);
				this.$pushPlayerMessage(lampPlayer, $t1);
				break;
			}
		}
	},
	$pushPlayerMessage: function(user, message) {
		this.$myGameServerInfo.queueManager.sendMessage$1(user, user.gateway, message);
	},
	pushProduct: function(product, applicablePlayers) {
		//
		//            myGameServerInfo.QueueManager.SendMessage("GameServerProducts", product);
	},
	$tick: function() {
		this.$myGame.tick();
	}
};
Type.registerClass(global, 'MMServer.ServerManager', $MMServer_ServerManager, Object, MMServerAPI.IServerManager);
