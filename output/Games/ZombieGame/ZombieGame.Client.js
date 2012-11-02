////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.CollisionType
var $ZombieGame_Client_CollisionType = function() {
};
$ZombieGame_Client_CollisionType.prototype = { empty: 0, full: 1, rightHalf: 2, topHalf: 3, leftHalf: 4, bottomHalf: 5 };
Type.registerEnum(global, 'ZombieGame.Client.CollisionType', $ZombieGame_Client_CollisionType, false);
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
		$ZombieGame_Client_Game$TaskHandler.start(Function.mkdel(this, function(completed) {
			this.$gameManager.loadTiles({ name: 'Pretty', tileWidth: 32, tileHeight: 32, tileMapFile: 'http://dested.com/lamp/Games/ZombieGame/assets/LostGarden+WoodTiles.png' }, completed);
		})).addTask(Function.mkdel(this, function(completed1) {
			this.$gameManager.loadTiles({ name: 'Pretty2', tileWidth: 32, tileHeight: 32, tileMapFile: 'http://dested.com/lamp/Games/ZombieGame/assets/watertileset3qb2tg0.png' }, completed1);
		})).addTask(Function.mkdel(this, function(completed2) {
			var bigMap = this.$gameManager.get_mapManager().loadMap({ mapWidth: 19, mapHeight: 21, name: 'Pretties', tileMap: $ZombieGame_Client_Game.$makeFakeMap('Pretty', 19, 21) });
			this.$gameManager.get_mapManager().addMapToRegion$1(bigMap, 0, 0);
			this.$gameManager.get_mapManager().addMapToRegion$1(this.$gameManager.get_mapManager().loadMap({ mapWidth: 12, mapHeight: 10, name: 'Pretties2', tileMap: $ZombieGame_Client_Game.$makeFakeMap('Pretty2', 12, 10) }), bigMap.mapWidth, 0);
			completed2();
		})).do();
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
// ZombieGame.Client.Game.TaskHandler
var $ZombieGame_Client_Game$TaskHandler = function() {
	this.$1$TasksField = null;
	this.$current = 0;
	this.set_tasks([]);
};
$ZombieGame_Client_Game$TaskHandler.prototype = {
	get_tasks: function() {
		return this.$1$TasksField;
	},
	set_tasks: function(value) {
		this.$1$TasksField = value;
	},
	addTask: function(task) {
		this.get_tasks().add(task);
		return this;
	},
	do: function() {
		this.get_tasks()[this.$current++](Function.mkdel(this, this.happen));
	},
	happen: function() {
		if (this.$current === this.get_tasks().length) {
			return;
		}
		this.get_tasks()[this.$current++](Function.mkdel(this, this.happen));
	}
};
$ZombieGame_Client_Game$TaskHandler.start = function(task) {
	return (new $ZombieGame_Client_Game$TaskHandler()).addTask(task);
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.GameManager
var $ZombieGame_Client_GameManager = function() {
	this.$1$TileManagerField = null;
	this.$1$MapManagerField = null;
	this.$1$WindowManagerField = null;
	this.set_tileManager(new $ZombieGame_Client_TileManager(this));
	this.set_mapManager(new $ZombieGame_Client_MapManager(this, 400, 400));
	this.set_windowManager(new $ZombieGame_Client_WindowManager(0, 0, 300, 350));
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
	get_windowManager: function() {
		return this.$1$WindowManagerField;
	},
	set_windowManager: function(value) {
		this.$1$WindowManagerField = value;
	},
	loadTiles: function(jsonTileMap, completed) {
		CommonClientLibraries.UIManager.CHelp.loadImageFromFile(jsonTileMap.tileMapFile, Function.mkdel(this, function(image) {
			this.get_tileManager().loadTiles(jsonTileMap, image, completed);
		}));
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
	this.collisionMap = null;
	this.$myMapManager = mapManager;
	this.name = jsonMap.name;
	this.mapWidth = jsonMap.mapWidth;
	this.mapHeight = jsonMap.mapHeight;
	this.tileMap = Array.multidim($ZombieGame_Client_Tile.getDefaultValue(), this.mapWidth, this.mapHeight);
	this.collisionMap = new Array(this.mapWidth);
	for (var x = 0; x < this.mapWidth; x++) {
		this.collisionMap[x] = new Array(this.mapHeight);
		for (var y = 0; y < this.mapHeight; y++) {
			var key = jsonMap.tileMap[x][y];
			var tile = this.$myMapManager.$myGameManager.get_tileManager().getTileByKey(key);
			this.tileMap.set(x, y, tile);
			this.collisionMap[x][y] = tile.get_collision();
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
				tile.draw(context, _x, _y, x, y);
			}
		}
		context.restore();
	}
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.GameMapLayout
var $ZombieGame_Client_GameMapLayout = function() {
	this.$1$GameMapField = null;
	this.$1$XField = 0;
	this.$1$YField = 0;
};
$ZombieGame_Client_GameMapLayout.prototype = {
	get_gameMap: function() {
		return this.$1$GameMapField;
	},
	set_gameMap: function(value) {
		this.$1$GameMapField = value;
	},
	get_x: function() {
		return this.$1$XField;
	},
	set_x: function(value) {
		this.$1$XField = value;
	},
	get_y: function() {
		return this.$1$YField;
	},
	set_y: function(value) {
		this.$1$YField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.MapManager
var $ZombieGame_Client_MapManager = function(gameManager, totalRegionWidth, totalRegionHeight) {
	this.$myGameManager = null;
	this.$myTotalRegionWidth = 0;
	this.$myTotalRegionHeight = 0;
	this.$1$GameMapsField = null;
	this.$1$CollisionMapField = null;
	this.$1$GameMapLayoutsField = null;
	this.$myGameManager = gameManager;
	this.$myTotalRegionWidth = totalRegionWidth;
	this.$myTotalRegionHeight = totalRegionHeight;
	this.set_gameMaps({});
	this.set_gameMapLayouts([]);
	this.set_collisionMap(new Array(totalRegionWidth));
	for (var x = 0; x < totalRegionWidth; x++) {
		this.get_collisionMap()[x] = new Array(totalRegionHeight);
		for (var y = 0; y < totalRegionHeight; y++) {
			this.get_collisionMap()[x][y] = 0;
		}
	}
};
$ZombieGame_Client_MapManager.prototype = {
	get_gameMaps: function() {
		return this.$1$GameMapsField;
	},
	set_gameMaps: function(value) {
		this.$1$GameMapsField = value;
	},
	get_collisionMap: function() {
		return this.$1$CollisionMapField;
	},
	set_collisionMap: function(value) {
		this.$1$CollisionMapField = value;
	},
	get_gameMapLayouts: function() {
		return this.$1$GameMapLayoutsField;
	},
	set_gameMapLayouts: function(value) {
		this.$1$GameMapLayoutsField = value;
	},
	loadMap: function(jsonMap) {
		var gameMap = new $ZombieGame_Client_GameMap(this, jsonMap);
		this.get_gameMaps()[gameMap.name] = gameMap;
		return gameMap;
	},
	addMapToRegion: function(name, x, y) {
		this.addMapToRegion$1(this.get_gameMaps()[name], x, y);
	},
	addMapToRegion$1: function(gameMap, x, y) {
		var $t2 = this.get_gameMapLayouts();
		var $t1 = new $ZombieGame_Client_GameMapLayout();
		$t1.set_gameMap(gameMap);
		$t1.set_x(x);
		$t1.set_y(y);
		$t2.add($t1);
		for (var _x = 0; _x < gameMap.mapWidth; _x++) {
			for (var _y = 0; _y < gameMap.mapHeight; _y++) {
				this.get_collisionMap()[_x + x][_y + y] = gameMap.collisionMap[_x][_y];
			}
		}
	},
	draw: function(context) {
		var $t1 = this.get_gameMapLayouts();
		for (var $t2 = 0; $t2 < $t1.length; $t2++) {
			var gameMapLayout = $t1[$t2];
			gameMapLayout.get_gameMap().draw(context, gameMapLayout.get_x() * $ZombieGame_Client_Game.TILESIZE, gameMapLayout.get_y() * $ZombieGame_Client_Game.TILESIZE);
		}
	}
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.Tile
var $ZombieGame_Client_Tile = function(canvas, x, y, jsonMap) {
	this.$jsonMap = null;
	this.tileMapY = 0;
	this.tileMapX = 0;
	this.image = null;
	this.$1$CollisionField = 0;
	this.$jsonMap = jsonMap;
	this.tileMapX = x;
	this.tileMapY = y;
	var imageData = canvas.context.getImageData(x, y, jsonMap.tileWidth, jsonMap.tileHeight);
	var data = CommonClientLibraries.CanvasInformation.create$1(imageData);
	this.set_collision(this.$randomCollision());
	this.image = data;
};
$ZombieGame_Client_Tile.prototype = {
	get_key: function() {
		return $ZombieGame_Client_Tile.makeKey(this.$jsonMap.name, ss.Int32.div(this.tileMapX, this.$jsonMap.tileWidth), ss.Int32.div(this.tileMapY, this.$jsonMap.tileHeight));
	},
	get_collision: function() {
		return this.$1$CollisionField;
	},
	set_collision: function(value) {
		this.$1$CollisionField = value;
	},
	$randomCollision: function() {
		if (Math.random() * 100 < 35) {
			return ss.Int32.trunc(Math.random() * 4 + 1);
		}
		return 0;
	},
	draw: function(context, _x, _y, mapX, mapY) {
		context.save();
		context.translate(_x + mapX * $ZombieGame_Client_Game.TILESIZE, _y + mapY * $ZombieGame_Client_Game.TILESIZE);
		context.translate(16, 16);
		//context.Rotate(fm);
		context.translate(-16, -16);
		context.drawImage(this.image.canvas, 0, 0);
		context.strokeStyle = 'red';
		context.strokeRect(0, 0, 32, 32);
		switch (this.get_collision()) {
			case 1: {
				context.fillStyle = 'rgba(233,12,22,0.6)';
				context.fillRect(0, 0, 32, 32);
				break;
			}
			case 2: {
				context.fillStyle = 'rgba(233,12,22,0.6)';
				context.fillRect(16, 0, 16, 32);
				break;
			}
			case 3: {
				context.fillStyle = 'rgba(233,12,22,0.6)';
				context.fillRect(0, 0, 32, 16);
				break;
			}
			case 4: {
				context.fillStyle = 'rgba(233,12,22,0.6)';
				context.fillRect(0, 0, 16, 32);
				break;
			}
			case 5: {
				context.fillStyle = 'rgba(233,12,22,0.6)';
				context.fillRect(0, 16, 32, 16);
				break;
			}
		}
		context.restore();
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
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.WindowManager
var $ZombieGame_Client_WindowManager = function(x, y, width, height) {
	this.$1$XField = 0;
	this.$1$YField = 0;
	this.$1$WidthField = 0;
	this.$1$HeightField = 0;
	this.set_x(x);
	this.set_y(y);
	this.set_width(width);
	this.set_height(height);
};
$ZombieGame_Client_WindowManager.prototype = {
	get_x: function() {
		return this.$1$XField;
	},
	set_x: function(value) {
		this.$1$XField = value;
	},
	get_y: function() {
		return this.$1$YField;
	},
	set_y: function(value) {
		this.$1$YField = value;
	},
	get_width: function() {
		return this.$1$WidthField;
	},
	set_width: function(value) {
		this.$1$WidthField = value;
	},
	get_height: function() {
		return this.$1$HeightField;
	},
	set_height: function(value) {
		this.$1$HeightField = value;
	}
};
Type.registerClass(global, 'ZombieGame.Client.Game', $ZombieGame_Client_Game, ClientAPI.LampClient);
Type.registerClass(global, 'ZombieGame.Client.Game$TaskHandler', $ZombieGame_Client_Game$TaskHandler, Object);
Type.registerClass(global, 'ZombieGame.Client.GameManager', $ZombieGame_Client_GameManager, Object);
Type.registerClass(global, 'ZombieGame.Client.GameMap', $ZombieGame_Client_GameMap, Object);
Type.registerClass(global, 'ZombieGame.Client.GameMapLayout', $ZombieGame_Client_GameMapLayout, Object);
Type.registerClass(global, 'ZombieGame.Client.MapManager', $ZombieGame_Client_MapManager, Object);
Type.registerClass(global, 'ZombieGame.Client.Tile', $ZombieGame_Client_Tile, Object);
Type.registerClass(global, 'ZombieGame.Client.TileManager', $ZombieGame_Client_TileManager, Object);
Type.registerClass(global, 'ZombieGame.Client.WindowManager', $ZombieGame_Client_WindowManager, Object);
$ZombieGame_Client_Game.instance = null;
$ZombieGame_Client_Game.TILESIZE = 32;
$ZombieGame_Client_Game.debugText = null;
