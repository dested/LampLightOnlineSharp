////////////////////////////////////////////////////////////////////////////////
// MMServer.ServerManager
var $MMServer_ServerManager = function(region, gameServerCapabilities) {
	this.$myGameServerCapabilities = null;
	this.$myServerGameManager = null;
	this.$myGameServerCapabilities = gameServerCapabilities;
	this.$myServerGameManager = new MMServerAPI.ServerGameManager(region, this);
};
$MMServer_ServerManager.prototype = {
	init: function() {
		//probably some big game switch to determine which "Game" to run. 
		this.$myServerGameManager.start(new ZombieGame.Server.Game(this.$myServerGameManager));
		setInterval(Function.mkdel(this, this.$tick), 100);
		//needs to be incredibly high resolution. c++ lib
	},
	end: function() {
		this.$myServerGameManager.end();
	},
	listenOnChannel: function(name, trigger) {
		this.$myGameServerCapabilities.listenOnChannel(name, trigger);
	},
	emit: function(player, message) {
		this.$myGameServerCapabilities.emit(player, message);
	},
	emitAll: function(players, message) {
		this.$myGameServerCapabilities.emitAll(Array.fromEnumerable(players), message);
	},
	$tick: function() {
		this.$myServerGameManager.tick();
	}
};
Type.registerClass(global, 'MMServer.ServerManager', $MMServer_ServerManager, Object, CommonAPI.IServerManager);
