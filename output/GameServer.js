require('./mscorlib.debug.js');require('./CommonLibraries.js');require('./CommonServerLibraries.js');require('./Models.js');require('./RawDeflate.js');
require('./mscorlib.debug.js');require('./CommonLibraries.js');require('./CommonServerLibraries.js');require('./Models.js');require('./RawDeflate.js');
require('./mscorlib.debug.js');require('./CommonLibraries.js');require('./CommonServerLibraries.js');require('./Models.js');require('./RawDeflate.js');
////////////////////////////////////////////////////////////////////////////////
// GameServer.DataManager
var $GameServer_DataManager = function() {
	this.$connection = null;
	this.gameData = null;
	this.$server = null;
	this.client = null;
	this.gameData = new $GameServer_DataManagerGameData(this);
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
// GameServer.DataManagerGameData
var $GameServer_DataManagerGameData = function(manager) {
	this.$manager = null;
	this.$manager = manager;
};
$GameServer_DataManagerGameData.prototype = {
	insert: function(gameName, answerIndex) {
		this.$manager.client.collection('gameInfo', function(err, collection) {
			var gmo = new $GameServer_GameInfoObject();
			gmo.gameName = gameName;
			gmo.answer = answerIndex;
			collection.insert(gmo);
		});
	}
};
////////////////////////////////////////////////////////////////////////////////
// GameServer.GameInfoObject
var $GameServer_GameInfoObject = function() {
	this.answer = 0;
	this.gameName = null;
};
////////////////////////////////////////////////////////////////////////////////
// GameServer.GameServer
var $GameServer_GameServer = function() {
	this.$dataManager = null;
	this.$gameServerIndex = null;
	this.$dataManager = new $GameServer_DataManager();
	this.$gameServerIndex = 'GameServer' + CommonLibraries.Guid.newGuid();
	process.on('exit', function() {
		console.log('exi');
	});
};
$GameServer_GameServer.$main = function() {
	new $GameServer_GameServer();
};
Type.registerClass(global, 'GameServer.DataManager', $GameServer_DataManager, Object);
Type.registerClass(global, 'GameServer.DataManagerGameData', $GameServer_DataManagerGameData, Object);
Type.registerClass(global, 'GameServer.GameInfoObject', $GameServer_GameInfoObject, Object);
Type.registerClass(global, 'GameServer.GameServer', $GameServer_GameServer, Object);
$GameServer_GameServer.$main();
