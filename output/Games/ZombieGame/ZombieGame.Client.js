////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.Game
var $ZombieGame_Client_Game = function() {
	this.$gameManager = null;
	this.$clicking = false;
	this.$myClickState = null;
	this.$myPlayers = null;
	ClientAPI.LampClient.call(this);
	$ZombieGame_Client_Game.instance = this;
	this.$gameManager = new $ZombieGame_Client_GameManager();
	$ZombieGame_Client_Game.debugText = [];
};
$ZombieGame_Client_Game.prototype = {
	bindKeys: function(manager) {
		manager.bind.key('space', function() {
			//keydown
		}, function() {
			//keyup
		});
	},
	init: function(players, context) {
		this.$myPlayers = players;
		this.$gameManager.loadTiles({ name: 'Pretty', tileWidth: 32, tileHeight: 32, tileMapFile: 'http://dested.com/lamp/Games/ZombieGame/assets/LostGarden+WoodTiles.png' }, Function.mkdel(this, function() {
			this.$gameManager.loadTiles({ name: 'Pretty2', tileWidth: 32, tileHeight: 32, tileMapFile: 'http://dested.com/lamp/Games/ZombieGame/assets/watertileset3qb2tg0.png' }, Function.mkdel(this, function() {
				this.$gameManager.loadMap({ mapWidth: 19, mapHeight: 21, name: 'Pretties', tileMap: $ZombieGame_Client_Game.$makeFakeMap('Pretty', 19, 21) });
				this.$gameManager.loadMap({ mapWidth: 12, mapHeight: 10, name: 'Pretties2', tileMap: $ZombieGame_Client_Game.$makeFakeMap('Pretty2', 12, 10) });
			}));
		}));
	},
	tick: function() {
	},
	buildUI: function(manager) {
		var manageData;
		var $t1 = new CommonClientLibraries.UIManager.UIArea(this.windowLocation.width - 400, 100, 250, 300);
		$t1.closable = true;
		manager.addArea(manageData = $t1);
		manageData.visible = true;
		var $t2 = new CommonClientLibraries.UIManager.TextArea(30, 25, Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Manage Defense'));
		$t2.color = 'blue';
		manageData.addControl(CommonClientLibraries.UIManager.TextArea).call(manageData, $t2);
		this.$myClickState = null;
		var $t3 = new (Type.makeGenericType(CommonClientLibraries.UIManager.Button$1, [Boolean]))(false, 20, 50, 100, 25, Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$1(Function.mkdel(this, function() {
			return (this.$myClickState.data ? 'This' : 'That');
		})));
		$t3.click = Function.mkdel(this, function(p) {
			this.$myClickState.data = !this.$myClickState.data;
		});
		this.$myClickState = $t3;
		manageData.addControl(Type.makeGenericType(CommonClientLibraries.UIManager.Button$1, [Boolean])).call(manageData, this.$myClickState);
		var $t4 = new CommonClientLibraries.UIManager.Button(20, 80, 100, 25, Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Send Wave'));
		$t4.click = function(p1) {
		};
		manageData.addControl(CommonClientLibraries.UIManager.Button).call(manageData, $t4);
	},
	mouseMove: function(jQueryEvent) {
		if (!this.$clicking) {
			return false;
		}
		return false;
	},
	onClick: function(jQueryEvent) {
		this.$clicking = true;
		return false;
	},
	mouseUp: function(jQueryEvent) {
		this.$clicking = false;
		return ClientAPI.LampClient.prototype.mouseUp.call(this, jQueryEvent);
	},
	draw: function(context) {
		context.fillStyle = 'black';
		context.fillRect(100, 100, 200, 200);
		this.$gameManager.draw(context);
		for (var i = 0; i < $ZombieGame_Client_Game.debugText.length; i++) {
			if ($ZombieGame_Client_Game.debugText[i]) {
				context.save();
				context.strokeStyle = 'white';
				context.strokeText($ZombieGame_Client_Game.debugText[i].toString(), this.windowLocation.width - 120, i * 20 + 150);
				context.restore();
			}
		}
	}
};
$ZombieGame_Client_Game.$makeFakeMap = function(name, w, h) {
	var keys = new Array(w);
	for (var x = 0; x < w; x++) {
		keys[x] = new Array(h);
		for (var y = 0; y < h; y++) {
			keys[x][y] = $ZombieGame_Client_Tile.makeKey(name, x, y);
		}
	}
	return keys;
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.GameManager
var $ZombieGame_Client_GameManager = function() {
	this.$1$TileManagerField = null;
	this.$1$MapManagerField = null;
	this.set_tileManager(new $ZombieGame_Client_TileManager(this));
	this.set_mapManager(new $ZombieGame_Client_MapManager(this));
};
$ZombieGame_Client_GameManager.prototype = {
	get_tileManager: function() {
		return this.$1$TileManagerField;
	},
	set_tileManager: function(value) {
		this.$1$TileManagerField = value;
	},
	get_mapManager: function() {
		return this.$1$MapManagerField;
	},
	set_mapManager: function(value) {
		this.$1$MapManagerField = value;
	},
	loadTiles: function(jsonTileMap, completed) {
		CommonClientLibraries.UIManager.CHelp.loadImageFromFile(jsonTileMap.tileMapFile, Function.mkdel(this, function(image) {
			this.get_tileManager().loadTiles(jsonTileMap, image, completed);
		}));
	},
	loadMap: function(jsonMap) {
		return this.get_mapManager().loadMap(jsonMap);
	},
	draw: function(context) {
		this.get_mapManager().draw(context);
	}
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.GameMap
var $ZombieGame_Client_GameMap = function(mapManager, jsonMap) {
	this.$myMapManager = null;
	this.mapWidth = 0;
	this.mapHeight = 0;
	this.name = null;
	this.tileMap = null;
	this.$myMapManager = mapManager;
	this.name = jsonMap.name;
	this.mapWidth = jsonMap.mapWidth;
	this.mapHeight = jsonMap.mapHeight;
	this.tileMap = Array.multidim($ZombieGame_Client_Tile.getDefaultValue(), this.mapWidth, this.mapHeight);
	for (var x = 0; x < this.mapWidth; x++) {
		for (var y = 0; y < this.mapHeight; y++) {
			var key = jsonMap.tileMap[x][y];
			var tile = this.$myMapManager.$myGameManager.get_tileManager().getTileByKey(key);
			this.tileMap.set(x, y, tile);
		}
	}
};
$ZombieGame_Client_GameMap.prototype = {
	getTileAt: function(x, y) {
		return this.tileMap.get(x, y);
	},
	draw: function(context, _x, _y) {
		context.save();
		context.scale(2, 2);
		for (var x = 0; x < this.mapWidth; x++) {
			for (var y = 0; y < this.mapHeight; y++) {
				var tile = this.tileMap.get(x, y);
				context.save();
				context.translate(_x + x * tile.image.canvas.width, _y + y * tile.image.canvas.height);
				context.translate(ss.Int32.div(tile.image.canvas.width, 2), ss.Int32.div(tile.image.canvas.height, 2));
				//context.Rotate(fm);
				context.translate(ss.Int32.div(-tile.image.canvas.width, 2), ss.Int32.div(-tile.image.canvas.height, 2));
				context.drawImage(tile.image.canvas, 0, 0);
				context.strokeStyle = 'red';
				context.strokeRect(0, 0, tile.image.canvas.width, tile.image.canvas.height);
				context.restore();
			}
		}
		context.restore();
	}
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.MapManager
var $ZombieGame_Client_MapManager = function(gameManager) {
	this.$myGameManager = null;
	this.$1$GameMapsField = null;
	this.$1$LoadedMapField = null;
	this.$myGameManager = gameManager;
	this.set_gameMaps({});
};
$ZombieGame_Client_MapManager.prototype = {
	get_gameMaps: function() {
		return this.$1$GameMapsField;
	},
	set_gameMaps: function(value) {
		this.$1$GameMapsField = value;
	},
	get_loadedMap: function() {
		return this.$1$LoadedMapField;
	},
	set_loadedMap: function(value) {
		this.$1$LoadedMapField = value;
	},
	loadMap: function(jsonMap) {
		var gameMap = new $ZombieGame_Client_GameMap(this, jsonMap);
		this.get_gameMaps()[gameMap.name] = gameMap;
		return gameMap;
	},
	draw: function(context) {
		this.get_gameMaps()['Pretties'].draw(context, 0, 0);
		this.get_gameMaps()['Pretties2'].draw(context, this.get_gameMaps()['Pretties'].mapWidth * this.get_gameMaps()['Pretties'].tileMap.get(0, 0).image.canvas.width, 0);
	}
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.Tile
var $ZombieGame_Client_Tile = function(canvas, x, y, jsonMap) {
	this.$jsonMap = null;
	this.tileMapY = 0;
	this.tileMapX = 0;
	this.image = null;
	this.$jsonMap = jsonMap;
	this.tileMapX = x;
	this.tileMapY = y;
	var imageData = canvas.context.getImageData(x, y, jsonMap.tileWidth, jsonMap.tileHeight);
	var data = CommonClientLibraries.CanvasInformation.create$1(imageData);
	this.image = data;
};
$ZombieGame_Client_Tile.prototype = {
	get_key: function() {
		return $ZombieGame_Client_Tile.makeKey(this.$jsonMap.name, ss.Int32.div(this.tileMapX, this.$jsonMap.tileWidth), ss.Int32.div(this.tileMapY, this.$jsonMap.tileHeight));
	}
};
$ZombieGame_Client_Tile.makeKey = function(name, x, y) {
	return String.format('{0}-{1}-{2}', name, x, y);
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.TileManager
var $ZombieGame_Client_TileManager = function(gameManager) {
	this.$myGameManager = null;
	this.$loadedTiles = null;
	this.$myGameManager = gameManager;
	this.$loadedTiles = {};
};
$ZombieGame_Client_TileManager.prototype = {
	loadTiles: function(jsonTileMap, tileImage, completed) {
		var canvas = CommonClientLibraries.CanvasInformation.create(tileImage);
		for (var x = 0; x < tileImage.width; x += jsonTileMap.tileWidth) {
			for (var y = 0; y < tileImage.height; y += jsonTileMap.tileHeight) {
				//load just the xy width*height of the canvas into a tile object for caching mostly. 
				var tile = new $ZombieGame_Client_Tile(canvas, x, y, jsonTileMap);
				//store each tile in a hash of name-x-y
				this.$loadedTiles[tile.get_key()] = tile;
			}
		}
		completed();
	},
	getTileByKey: function(key) {
		return this.$loadedTiles[key];
	}
};
Type.registerClass(global, 'ZombieGame.Client.Game', $ZombieGame_Client_Game, ClientAPI.LampClient);
Type.registerClass(global, 'ZombieGame.Client.GameManager', $ZombieGame_Client_GameManager, Object);
Type.registerClass(global, 'ZombieGame.Client.GameMap', $ZombieGame_Client_GameMap, Object);
Type.registerClass(global, 'ZombieGame.Client.MapManager', $ZombieGame_Client_MapManager, Object);
Type.registerClass(global, 'ZombieGame.Client.Tile', $ZombieGame_Client_Tile, Object);
Type.registerClass(global, 'ZombieGame.Client.TileManager', $ZombieGame_Client_TileManager, Object);
$ZombieGame_Client_Game.instance = null;
$ZombieGame_Client_Game.debugText = null;
