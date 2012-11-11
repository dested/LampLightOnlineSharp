////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Server.Game
var $ZombieGame_Server_Game = function(region, manager) {
	this.$gameManager = null;
	MMServerAPI.LampServer.call(this, region, manager);
	this.$gameManager = new $ZombieGame_Server_ZombieServerGameManager(this);
};
$ZombieGame_Server_Game.prototype = {
	init: function() {
		MMServerAPI.LampServer.prototype.init.call(this);
		CommonAPI.TaskHandler.start(Function.mkdel(this, function(completed) {
			this.$gameManager.loadTiles($ZombieGame_Server_Game.$fakeJsonTileMap2(), completed);
		})).addTask(Function.mkdel(this, function(completed1) {
			this.$gameManager.loadTiles($ZombieGame_Server_Game.$fakeJsonTileMap(), completed1);
		})).addTask(Function.mkdel(this, function(completed2) {
			var bigMap = this.$gameManager.mapManager.loadMap($ZombieGame_Server_Game.$fakeJsonMap2());
			this.$gameManager.mapManager.addMapToRegion$1(bigMap, 0, 0);
			this.$gameManager.mapManager.addMapToRegion$1(this.$gameManager.mapManager.loadMap($ZombieGame_Server_Game.$fakeJsonMap()), bigMap.mapWidth, 0);
			completed2();
		})).do();
		this.$gameManager.init();
		this.myManager.listenOnChannel(ZombieGame.Common.Messages.PlayerMoveMessage.messageChannel, function(user, model) {
			var message = model;
		});
		this.myManager.listenOnChannel(ZombieGame.Common.Messages.PlayerJoinMessage.messageChannel, function(user1, model1) {
			var message1 = model1;
		});
	},
	gameTick: function() {
	},
	executeAction: function(action) {
		var zAction = action;
		switch (zAction.zombieActionType) {
			case 0: {
				var zMoveAction = zAction;
				break;
			}
		}
		MMServerAPI.LampServer.prototype.executeAction.call(this, action);
	}
};
$ZombieGame_Server_Game.$makeFakeMap = function(name, w, h) {
	var keys = new Array(w);
	for (var x = 0; x < w; x++) {
		keys[x] = new Array(h);
		for (var y = 0; y < h; y++) {
			keys[x][y] = ZombieGame.Common.Tile.makeKey(name, x, y);
		}
	}
	return keys;
};
$ZombieGame_Server_Game.$fakeJsonTileMap2 = function() {
	return { mapWidth: 20, mapHeight: 16, name: 'Pretty', tileWidth: ZombieGame.Common.ZombieGameConfig.tileSize, tileHeight: ZombieGame.Common.ZombieGameConfig.tileSize, tileMapURL: 'http://50.116.22.241:8881/lamp/Games/ZombieGame/assets/top.png' };
};
$ZombieGame_Server_Game.$fakeJsonTileMap = function() {
	return { mapWidth: 12, mapHeight: 10, name: 'Pretty2', tileWidth: ZombieGame.Common.ZombieGameConfig.tileSize, tileHeight: ZombieGame.Common.ZombieGameConfig.tileSize, tileMapURL: 'http://50.116.22.241:8881/lamp/Games/ZombieGame/assets/watertileset3qb2tg0.png' };
};
$ZombieGame_Server_Game.$fakeJsonMap2 = function() {
	return { mapWidth: 20, mapHeight: 16, name: 'Pretties', tileMap: $ZombieGame_Server_Game.$makeFakeMap('Pretty', 20, 16) };
};
$ZombieGame_Server_Game.$fakeJsonMap = function() {
	return { mapWidth: 12, mapHeight: 10, name: 'Pretties2', tileMap: $ZombieGame_Server_Game.$makeFakeMap('Pretty2', 12, 10) };
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Server.MovePlayerZombieLampAction
var $ZombieGame_Server_MovePlayerZombieLampAction = function() {
};
$ZombieGame_Server_MovePlayerZombieLampAction.createInstance = function() {
	return $ZombieGame_Server_MovePlayerZombieLampAction.$ctor();
};
$ZombieGame_Server_MovePlayerZombieLampAction.$ctor = function() {
	var $this = $ZombieGame_Server_ZombieLampAction.$ctor();
	$this.x = 0;
	$this.y = 0;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Server.ZombieActionType
var $ZombieGame_Server_ZombieActionType = function() {
};
$ZombieGame_Server_ZombieActionType.prototype = { movePlayer: 0 };
Type.registerEnum(global, 'ZombieGame.Server.ZombieActionType', $ZombieGame_Server_ZombieActionType, false);
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Server.ZombieLampAction
var $ZombieGame_Server_ZombieLampAction = function() {
};
$ZombieGame_Server_ZombieLampAction.createInstance = function() {
	return $ZombieGame_Server_ZombieLampAction.$ctor();
};
$ZombieGame_Server_ZombieLampAction.$ctor = function() {
	var $this = MMServerAPI.LampAction.$ctor();
	$this.zombieActionType = 0;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Server.ZombieServerGameManager
var $ZombieGame_Server_ZombieServerGameManager = function(game) {
	this.game = null;
	ZombieGame.Common.GameManager.call(this);
	this.game = game;
};
$ZombieGame_Server_ZombieServerGameManager.prototype = {
	loadTiles: function(jsonTileMap, completed) {
		this.tileManager.loadTiles(jsonTileMap, completed);
	}
};
Type.registerClass(global, 'ZombieGame.Server.Game', $ZombieGame_Server_Game, MMServerAPI.LampServer);
Type.registerClass(global, 'ZombieGame.Server.ZombieLampAction', $ZombieGame_Server_ZombieLampAction);
Type.registerClass(global, 'ZombieGame.Server.ZombieServerGameManager', $ZombieGame_Server_ZombieServerGameManager, ZombieGame.Common.GameManager);
Type.registerClass(global, 'ZombieGame.Server.MovePlayerZombieLampAction', $ZombieGame_Server_MovePlayerZombieLampAction);
