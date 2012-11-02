////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.ClickMode
var $ZombieGame_Client_ClickMode = function() {
};
$ZombieGame_Client_ClickMode.prototype = { moveCharacter: 0, dragMap: 1 };
Type.registerEnum(global, 'ZombieGame.Client.ClickMode', $ZombieGame_Client_ClickMode, false);
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.CollisionType
var $ZombieGame_Client_CollisionType = function() {
};
$ZombieGame_Client_CollisionType.prototype = { empty: 0, full: 1, rightHalf: 2, topHalf: 3, leftHalf: 4, bottomHalf: 5 };
Type.registerEnum(global, 'ZombieGame.Client.CollisionType', $ZombieGame_Client_CollisionType, false);
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.Game
var $ZombieGame_Client_Game = function() {
	this.$clicking = false;
	this.$gameManager = null;
	this.$myClickState = null;
	this.$myPlayers = null;
	ClientAPI.LampClient.call(this);
	this.$gameManager = new $ZombieGame_Client_GameManager(this);
	$ZombieGame_Client_Game.debugText = [];
};
$ZombieGame_Client_Game.prototype = {
	resize: function() {
	},
	bindKeys: function(manager) {
		manager.bind.key('ctrl', Function.mkdel(this, function() {
			//keydown
			this.$gameManager.clickMode = 1;
		}), Function.mkdel(this, function() {
			//keyup
			this.$gameManager.clickMode = 0;
		}));
		manager.bind.key('shift', function() {
			//keydown
		}, function() {
			//keyup
		});
	},
	init: function(players, context) {
		this.$myPlayers = players;
		this.$gameManager.gameMode = 1;
		CommonAPI.TaskHandler.start(Function.mkdel(this, function(completed) {
			this.$gameManager.loadTiles($ZombieGame_Client_Game.$fakeJsonTileMap2(), completed);
		})).addTask(Function.mkdel(this, function(completed1) {
			this.$gameManager.loadTiles($ZombieGame_Client_Game.$fakeJsonTileMap(), completed1);
		})).addTask(Function.mkdel(this, function(completed2) {
			var bigMap = this.$gameManager.mapManager.loadMap($ZombieGame_Client_Game.$fakeJsonMap2());
			this.$gameManager.mapManager.addMapToRegion$1(bigMap, 0, 0);
			this.$gameManager.mapManager.addMapToRegion$1(this.$gameManager.mapManager.loadMap($ZombieGame_Client_Game.$fakeJsonMap()), bigMap.mapWidth, 0);
			completed2();
		})).do();
		this.$gameManager.init();
	},
	tick: function() {
		this.$gameManager.tick();
	},
	buildUI: function(manager) {
		var manageData;
		var $t1 = new CommonClientLibraries.UIManager.UIArea(this.screen.width - 400, 100, 250, 300);
		$t1.closable = true;
		manager.addArea(manageData = $t1);
		manageData.visible = true;
		var $t2 = new CommonClientLibraries.UIManager.TextArea(30, 25, Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Manage Defense'));
		$t2.color = 'blue';
		manageData.addControl(CommonClientLibraries.UIManager.TextArea).call(manageData, $t2);
		manageData.addControl(CommonClientLibraries.UIManager.TextArea).call(manageData, new CommonClientLibraries.UIManager.TextArea(5, 50, Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Mode: ')));
		this.$myClickState = null;
		var $t3 = new (Type.makeGenericType(CommonClientLibraries.UIManager.Button$1, [Boolean]))(true, 20, 50, 100, 25, Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$1(Function.mkdel(this, function() {
			return (this.$myClickState.data ? 'Edit' : 'Play');
		})));
		$t3.click = Function.mkdel(this, function(p) {
			this.$myClickState.data = !this.$myClickState.data;
			if (this.$myClickState.data) {
				this.$gameManager.gameMode = 1;
			}
			else {
				this.$gameManager.gameMode = 0;
			}
		});
		this.$myClickState = $t3;
		manageData.addControl(Type.makeGenericType(CommonClientLibraries.UIManager.Button$1, [Boolean])).call(manageData, this.$myClickState);
		var $t4 = new CommonClientLibraries.UIManager.Button(20, 80, 100, 25, Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Send Wave'));
		$t4.click = function(p1) {
		};
		manageData.addControl(CommonClientLibraries.UIManager.Button).call(manageData, $t4);
	},
	mouseMove: function(pointer) {
		if (!this.$clicking) {
			return false;
		}
		if (this.$gameManager.clickMode === 1) {
			this.$gameManager.windowManager.centerAround(pointer.x, pointer.y);
		}
		return false;
	},
	onClick: function(pointer) {
		this.$clicking = true;
		if (this.$gameManager.clickMode === 0) {
			pointer = this.$offsetPointer(pointer);
			this.$gameManager.unitManager.mainCharacter.moveTowards(pointer.x, pointer.y);
		}
		return false;
	},
	$offsetPointer: function(pointer) {
		pointer = this.$gameManager.offsetPointer(pointer);
		//the screen offset
		pointer.x = ss.Int32.div(pointer.x, this.$gameManager.scale.x);
		pointer.y = ss.Int32.div(pointer.y, this.$gameManager.scale.y);
		//the scale "offset"
		pointer = this.$gameManager.windowManager.offsetPointer(pointer);
		//the window offset
		return pointer;
	},
	mouseUp: function(pointer) {
		this.$clicking = false;
		return ClientAPI.LampClient.prototype.mouseUp.call(this, pointer);
	},
	draw: function(context) {
		context.fillStyle = 'black';
		context.fillRect(100, 100, 200, 200);
		this.$gameManager.draw(context);
		for (var i = 0; i < $ZombieGame_Client_Game.debugText.length; i++) {
			if ($ZombieGame_Client_Game.debugText[i]) {
				context.save();
				context.strokeStyle = 'white';
				context.strokeText($ZombieGame_Client_Game.debugText[i].toString(), this.screen.width - 120, i * 20 + 150);
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
$ZombieGame_Client_Game.$fakeJsonTileMap2 = function() {
	return { name: 'Pretty', tileWidth: $ZombieGame_Client_Game.TILESIZE, tileHeight: $ZombieGame_Client_Game.TILESIZE, tileMapFile: 'http://dested.com/lamp/Games/ZombieGame/assets/top.png' };
};
$ZombieGame_Client_Game.$fakeJsonTileMap = function() {
	return { name: 'Pretty2', tileWidth: $ZombieGame_Client_Game.TILESIZE, tileHeight: $ZombieGame_Client_Game.TILESIZE, tileMapFile: 'http://dested.com/lamp/Games/ZombieGame/assets/watertileset3qb2tg0.png' };
};
$ZombieGame_Client_Game.$fakeJsonMap2 = function() {
	return { mapWidth: 20, mapHeight: 16, name: 'Pretties', tileMap: $ZombieGame_Client_Game.$makeFakeMap('Pretty', 20, 16) };
};
$ZombieGame_Client_Game.$fakeJsonMap = function() {
	return { mapWidth: 12, mapHeight: 10, name: 'Pretties2', tileMap: $ZombieGame_Client_Game.$makeFakeMap('Pretty2', 12, 10) };
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.GameManager
var $ZombieGame_Client_GameManager = function(game) {
	this.$myGame = null;
	this.$screenOffset = null;
	this.tileManager = null;
	this.mapManager = null;
	this.windowManager = null;
	this.gameMode = 0;
	this.clickMode = 0;
	this.unitManager = null;
	this.scale = null;
	this.$myGame = game;
	this.tileManager = new $ZombieGame_Client_TileManager(this);
	this.mapManager = new $ZombieGame_Client_MapManager(this, 400, 400);
	this.windowManager = new $ZombieGame_Client_WindowManager(this, 0, 0, 400, 225);
	this.unitManager = new $ZombieGame_Client_UnitManager(this);
	this.$screenOffset = CommonLibraries.Point.$ctor1(0, 0);
	this.scale = CommonLibraries.Point.$ctor1(2, 2);
	this.clickMode = 0;
};
$ZombieGame_Client_GameManager.prototype = {
	loadTiles: function(jsonTileMap, completed) {
		CommonClientLibraries.UIManager.CHelp.loadImageFromFile(jsonTileMap.tileMapFile, Function.mkdel(this, function(image) {
			this.tileManager.loadTiles(jsonTileMap, image, completed);
		}));
	},
	draw: function(context) {
		context.save();
		switch (this.gameMode) {
			case 0: {
				break;
			}
			case 1: {
				this.$screenOffset.x = ss.Int32.div(this.$myGame.screen.width, 2) - ss.Int32.div(this.windowManager.width * this.scale.x, 2);
				this.$screenOffset.y = ss.Int32.div(this.$myGame.screen.height, 2) - ss.Int32.div(this.windowManager.height * this.scale.y, 2);
				context.translate(this.$screenOffset.x, this.$screenOffset.y);
				this.$playDraw(context);
				break;
			}
		}
		context.restore();
	},
	$playDraw: function(context) {
		var wm = this.windowManager;
		var wX = Math.max(0, ss.Int32.div(wm.x, $ZombieGame_Client_Game.TILESIZE) - 3);
		var wY = Math.max(0, ss.Int32.div(wm.y, $ZombieGame_Client_Game.TILESIZE) - 3);
		var wWidth = wX + ss.Int32.div(wm.width, $ZombieGame_Client_Game.TILESIZE) + 6;
		var wHeight = wY + ss.Int32.div(wm.height, $ZombieGame_Client_Game.TILESIZE) + 6;
		context.save();
		context.scale(this.scale.x, this.scale.y);
		context.beginPath();
		context.rect(0, 0, wm.width, wm.height);
		context.clip();
		context.closePath();
		context.translate(-wm.x, -wm.y);
		this.mapManager.draw(context, wX, wY, wWidth, wHeight);
		this.unitManager.draw(context);
		context.restore();
	},
	offsetPointer: function(pointer) {
		return CommonClientLibraries.UIManager.Pointer.$ctor(pointer.x - this.$screenOffset.x, pointer.y - this.$screenOffset.y, pointer);
	},
	init: function() {
		this.unitManager.init();
	},
	tick: function() {
		this.unitManager.tick();
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
	this.tileMap = new Array(this.mapWidth);
	this.collisionMap = new Array(this.mapWidth);
	for (var x = 0; x < this.mapWidth; x++) {
		this.tileMap[x] = new Array(this.mapHeight);
		this.collisionMap[x] = new Array(this.mapHeight);
		for (var y = 0; y < this.mapHeight; y++) {
			var key = jsonMap.tileMap[x][y];
			var tile = this.$myMapManager.$myGameManager.tileManager.getTileByKey(key);
			this.tileMap[x][y] = tile;
			this.collisionMap[x][y] = tile.get_collision();
		}
	}
};
$ZombieGame_Client_GameMap.prototype = {
	getTileAt: function(x, y) {
		return this.tileMap[x][y];
	},
	draw: function(context, tileX, tileY, wWidth, wHeight) {
		context.save();
		for (var x = tileX; x < wWidth; x++) {
			for (var y = tileY; y < wHeight; y++) {
				var tile = CommonLibraries.Extensions.getSafe($ZombieGame_Client_Tile).call(null, this.tileMap, x, y);
				if (ss.isNullOrUndefined(tile)) {
					continue;
				}
				tile.draw(context, tileX, tileY, x, y);
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
// ZombieGame.Client.GameMode
var $ZombieGame_Client_GameMode = function() {
};
$ZombieGame_Client_GameMode.prototype = { tileEdit: 0, play: 1 };
Type.registerEnum(global, 'ZombieGame.Client.GameMode', $ZombieGame_Client_GameMode, false);
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.MapManager
var $ZombieGame_Client_MapManager = function(gameManager, totalRegionWidth, totalRegionHeight) {
	this.$myGameManager = null;
	this.$myTotalRegionHeight = 0;
	this.$myTotalRegionWidth = 0;
	this.$1$GameMapsField = null;
	this.$1$CollisionMapField = null;
	this.$1$GameMapLayoutsField = null;
	this.$myGameManager = gameManager;
	this.$myTotalRegionWidth = totalRegionWidth;
	this.$myTotalRegionHeight = totalRegionHeight;
	this.set_gameMaps({});
	this.set_gameMapLayouts([]);
	this.set_collisionMap(new Array(this.$myTotalRegionWidth));
	for (var x = 0; x < this.$myTotalRegionWidth; x++) {
		this.get_collisionMap()[x] = new Array(this.$myTotalRegionHeight);
		for (var y = 0; y < this.$myTotalRegionHeight; y++) {
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
	draw: function(context, wX, wY, wWidth, wHeight) {
		context.save();
		wWidth = Math.min(wWidth, this.$myTotalRegionWidth);
		wHeight = Math.min(wHeight, this.$myTotalRegionHeight);
		var $t1 = this.get_gameMapLayouts();
		for (var $t2 = 0; $t2 < $t1.length; $t2++) {
			var gameMapLayout = $t1[$t2];
			gameMapLayout.get_gameMap().draw(context, gameMapLayout.get_x() + wX, gameMapLayout.get_y() + wY, wWidth, wHeight);
		}
		context.restore();
	}
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.Person
var $ZombieGame_Client_Person = function() {
	$ZombieGame_Client_Unit.call(this);
};
$ZombieGame_Client_Person.prototype = {
	init: function() {
		this.moveRate = 5;
		$ZombieGame_Client_Unit.prototype.init.call(this);
	},
	draw: function(context) {
		context.save();
		context.fillStyle = 'blue';
		context.fillRect(this.x - 13, this.y - 13, 26, 26);
		context.restore();
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
// ZombieGame.Client.Unit
var $ZombieGame_Client_Unit = function() {
	this.$movingTowards = null;
	this.x = 0;
	this.y = 0;
	this.moveRate = 0;
	this.updatePosition = null;
	this.moveRate = 2;
};
$ZombieGame_Client_Unit.prototype = {
	init: function() {
		this.updatePosition(this.x, this.y);
	},
	draw: function(context) {
	},
	moveTowards: function(x, y) {
		this.$movingTowards = CommonLibraries.Point.$ctor1(x, y);
	},
	tick: function() {
		if (ss.isValue(this.$movingTowards)) {
			if (Math.abs(this.$movingTowards.x - this.x) < 6 && Math.abs(this.$movingTowards.y - this.y) < 6) {
				this.$movingTowards = null;
			}
			else {
				var m = CommonLibraries.Point.normalize(CommonLibraries.Point.negate$1(this.$movingTowards, this.x, this.y), this.moveRate);
				this.x += m.x;
				this.y += m.y;
				this.updatePosition(this.x, this.y);
			}
		}
	}
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.UnitManager
var $ZombieGame_Client_UnitManager = function(gameManager) {
	this.$myGameManager = null;
	this.$characterCenterPadding = CommonLibraries.Point.$ctor1(150, 150);
	this.mainCharacter = null;
	this.$myGameManager = gameManager;
	var $t1 = new $ZombieGame_Client_Person();
	$t1.x = 100;
	$t1.y = 170;
	$t1.updatePosition = Function.mkdel(this, function(x, y) {
		this.$myGameManager.windowManager.centerAround(x, y);
	});
	this.mainCharacter = $t1;
};
$ZombieGame_Client_UnitManager.prototype = {
	draw: function(context) {
		this.mainCharacter.draw(context);
	},
	init: function() {
		this.mainCharacter.init();
	},
	tick: function() {
		this.mainCharacter.tick();
	}
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.WindowManager
var $ZombieGame_Client_WindowManager = function(gameManager, x, y, width, height) {
	this.$myGameManager = null;
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	this.$myGameManager = gameManager;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
$ZombieGame_Client_WindowManager.prototype = {
	centerAround: function(x, y) {
		this.x = Math.max(x - ss.Int32.div(this.width, 2), 0);
		this.y = Math.max(y - ss.Int32.div(this.height, 2), 0);
	},
	offsetPointer: function(pointer) {
		return CommonClientLibraries.UIManager.Pointer.$ctor(this.x + pointer.x, this.y + pointer.y, pointer);
	}
};
Type.registerClass(global, 'ZombieGame.Client.Game', $ZombieGame_Client_Game, ClientAPI.LampClient);
Type.registerClass(global, 'ZombieGame.Client.GameManager', $ZombieGame_Client_GameManager, Object);
Type.registerClass(global, 'ZombieGame.Client.GameMap', $ZombieGame_Client_GameMap, Object);
Type.registerClass(global, 'ZombieGame.Client.GameMapLayout', $ZombieGame_Client_GameMapLayout, Object);
Type.registerClass(global, 'ZombieGame.Client.MapManager', $ZombieGame_Client_MapManager, Object);
Type.registerClass(global, 'ZombieGame.Client.Tile', $ZombieGame_Client_Tile, Object);
Type.registerClass(global, 'ZombieGame.Client.TileManager', $ZombieGame_Client_TileManager, Object);
Type.registerClass(global, 'ZombieGame.Client.Unit', $ZombieGame_Client_Unit, Object);
Type.registerClass(global, 'ZombieGame.Client.UnitManager', $ZombieGame_Client_UnitManager, Object);
Type.registerClass(global, 'ZombieGame.Client.WindowManager', $ZombieGame_Client_WindowManager, Object);
Type.registerClass(global, 'ZombieGame.Client.Person', $ZombieGame_Client_Person, $ZombieGame_Client_Unit);
$ZombieGame_Client_Game.TILESIZE = 32;
$ZombieGame_Client_Game.debugText = null;
