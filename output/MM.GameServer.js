require('./mscorlib.debug.js');
require('./CommonAPI.js');
require('./MMServerAPI.js');
require('./CommonLibraries.js');
require('./CommonServerLibraries.js');
require('./CommonClientLibraries.js');
require('./MMServer.js');
require('./Games/ZombieGame/ZombieGame.Common.js');
require('./Games/ZombieGame/ZombieGame.Server.js');
require('./Models.js');
require('./RawDeflate.js');

// MM.GameServer.GameInfoObject
var $MM_GameServer_GameInfoObject = function() {
	this.answer = 0;
	this.gameName = null;
};
////////////////////////////////////////////////////////////////////////////////
// MM.GameServer.GameServer
var $MM_GameServer_GameServer = function(region) {
	this.$myGameInfo = null;
	this.$serverManager = null;
	var gameServerIndex = 'GameServer' + CommonLibraries.Guid.newGuid();
	var $t1 = CommonServerLibraries.GameServerInfo.$ctor();
	$t1.dataManager = new CommonServerLibraries.DataManager();
	$t1.gameServerName = gameServerIndex;
	$t1.queueManager = new CommonServerLibraries.Queue.QueueManager(gameServerIndex);
	this.$myGameInfo = $t1;
	this.$serverManager = new MMServer.ServerManager(region, this.$myGameInfo);
	process.on('exit', Function.mkdel(this, function() {
		this.$serverManager.end();
		console.log('exiting game server ' + gameServerIndex);
	}));
	this.$serverManager.init();
};
$MM_GameServer_GameServer.$main = function() {
	var region = 1;
	new $MM_GameServer_GameServer(region);
};
Type.registerClass(global, 'MM.GameServer.GameInfoObject', $MM_GameServer_GameInfoObject, Object);
Type.registerClass(global, 'MM.GameServer.GameServer', $MM_GameServer_GameServer, Object);
$MM_GameServer_GameServer.$main();
