require('./mscorlib.debug.js');require('./CommonAPI.js');require('./MMServerAPI.js');require('./CommonLibraries.js');require('./CommonServerLibraries.js');require('./CommonClientLibraries.js');require('./MMServer.js');require('./Games/ZombieGame/ZombieGame.Common.js');require('./Games/ZombieGame/ZombieGame.Server.js');require('./Models.js');require('./RawDeflate.js');
// MM.GameServer.DataManager
var $MM_GameServer_DataManager = function() {
	this.$connection = null;
	this.gameData = null;
	this.$server = null;
	this.client = null;
	this.gameData = new $MM_GameServer_DataManagerGameData(this);
	var mongo = require('mongodb');
	var Db = mongo.Db;
	this.$connection = mongo.Connection;
	var server = this.$server = mongo.Server;
	this.client = new Db('test', new server('50.116.28.16', 27017, {}));
	this.client.open(function(arg1, arg2) {
		//client.Collection("test_insert", "test");
	});
};
////////////////////////////////////////////////////////////////////////////////
// MM.GameServer.DataManagerGameData
var $MM_GameServer_DataManagerGameData = function(manager) {
	this.$manager = null;
	this.$manager = manager;
};
$MM_GameServer_DataManagerGameData.prototype = {
	insert: function(gameName, answerIndex) {
		this.$manager.client.collection('gameInfo', function(err, collection) {
			var gmo = new $MM_GameServer_GameInfoObject();
			gmo.gameName = gameName;
			gmo.answer = answerIndex;
			collection.insert(gmo);
		});
	}
};
////////////////////////////////////////////////////////////////////////////////
// MM.GameServer.GameInfoObject
var $MM_GameServer_GameInfoObject = function() {
	this.answer = 0;
	this.gameName = null;
};
////////////////////////////////////////////////////////////////////////////////
// MM.GameServer.GameServer
var $MM_GameServer_GameServer = function(region) {
	this.$dataManager = null;
	this.$gameServerIndex = null;
	this.$qManager = null;
	this.$serverManager = null;
	this.$serverManager = new MMServer.ServerManager(region, Function.mkdel(this, this.$listenOnChannel));
	this.$dataManager = new $MM_GameServer_DataManager();
	this.$gameServerIndex = 'GameServer' + CommonLibraries.Guid.newGuid();
	process.on('exit', Function.mkdel(this, function() {
		this.$serverManager.end();
		console.log('exiting game server ' + this.$gameServerIndex);
	}));
	this.$qManager = new CommonServerLibraries.Queue.QueueManager(this.$gameServerIndex, new CommonServerLibraries.Queue.QueueManagerOptions([new CommonServerLibraries.Queue.QueueWatcher('GameServer', null), new CommonServerLibraries.Queue.QueueWatcher(this.$gameServerIndex, null)], ['GameServer', 'GatewayServer', 'Gateway*']));
	this.$serverManager.init();
};
$MM_GameServer_GameServer.prototype = {
	$listenOnChannel: function(channel, trigger) {
		this.$qManager.addChannel(channel, trigger);
	}
};
$MM_GameServer_GameServer.$main = function() {
	var region = 1;
	new $MM_GameServer_GameServer(region);
};
Type.registerClass(global, 'MM.GameServer.DataManager', $MM_GameServer_DataManager, Object);
Type.registerClass(global, 'MM.GameServer.DataManagerGameData', $MM_GameServer_DataManagerGameData, Object);
Type.registerClass(global, 'MM.GameServer.GameInfoObject', $MM_GameServer_GameInfoObject, Object);
Type.registerClass(global, 'MM.GameServer.GameServer', $MM_GameServer_GameServer, Object);
$MM_GameServer_GameServer.$main();
