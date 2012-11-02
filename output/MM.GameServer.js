////////////////////////////////////////////////////////////////////////////////
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
var $MM_GameServer_GameServer = function() {
	this.$dataManager = null;
	this.$gameServerIndex = null;
	this.$dataManager = new $MM_GameServer_DataManager();
	this.$gameServerIndex = 'GameServer' + CommonLibraries.Guid.newGuid();
	process.on('exit', function() {
		console.log('exi');
	});
};
$MM_GameServer_GameServer.$main = function() {
	new $MM_GameServer_GameServer();
};
Type.registerClass(global, 'MM.GameServer.DataManager', $MM_GameServer_DataManager, Object);
Type.registerClass(global, 'MM.GameServer.DataManagerGameData', $MM_GameServer_DataManagerGameData, Object);
Type.registerClass(global, 'MM.GameServer.GameInfoObject', $MM_GameServer_GameInfoObject, Object);
Type.registerClass(global, 'MM.GameServer.GameServer', $MM_GameServer_GameServer, Object);
$MM_GameServer_GameServer.$main();
