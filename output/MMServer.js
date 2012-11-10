////////////////////////////////////////////////////////////////////////////////
// MMServer.ServerManager
var $MMServer_ServerManager = function(region, onChannel) {
	this.$myOnChannel = null;
	this.$myServerGameManager = null;
	this.$myOnChannel = onChannel;
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
		this.$myOnChannel(name, trigger);
	},
	$tick: function() {
		this.$myServerGameManager.tick();
	}
};
Type.registerClass(global, 'MMServer.ServerManager', $MMServer_ServerManager, Object, CommonAPI.IServerManager);
