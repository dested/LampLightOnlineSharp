////////////////////////////////////////////////////////////////////////////////
// Server.GameManager
var $Server_$GameManager = function() {
	this.$game = null;
	this.$game = new ZombieGame.Server.Game();
};
$Server_$GameManager.prototype = {
	$tick: function() {
		this.$game.tick();
	},
	$start: function() {
		this.$game.init([]);
	}
};
////////////////////////////////////////////////////////////////////////////////
// Server.ServerManager
var $Server_ServerManager = function() {
	this.$gameManager = null;
	this.$gameManager = new $Server_$GameManager();
	window.setInterval(Function.mkdel(this, this.$tick), 100);
	this.$gameManager.$start();
};
$Server_ServerManager.prototype = {
	$tick: function() {
		this.$gameManager.$tick();
	}
};
$Server_ServerManager.$main = function() {
	new $Server_ServerManager();
	;
};
Type.registerClass(null, 'Server.$GameManager', $Server_$GameManager, Object);
Type.registerClass(global, 'Server.ServerManager', $Server_ServerManager, Object);
$Server_ServerManager.$main();
