////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Common.AStarNode
var $ZombieGame_Common_AStarNode = function(movementCost, heuristicCost, parent, coord) {
	this.totalCost = 0;
	this.movementCost = 0;
	this.heuristicCost = 0;
	this.parent = null;
	this.coordinate = null;
	this.totalCost = movementCost + heuristicCost;
	this.movementCost = movementCost;
	this.heuristicCost = heuristicCost;
	this.parent = parent;
	this.coordinate = coord;
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Common.CollisionType
var $ZombieGame_Common_CollisionType = function() {
};
$ZombieGame_Common_CollisionType.prototype = { empty: 0, full: 1, rightHalf: 2, topHalf: 3, leftHalf: 4, bottomHalf: 5 };
Type.registerEnum(global, 'ZombieGame.Common.CollisionType', $ZombieGame_Common_CollisionType, false);
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Common.GameManager
var $ZombieGame_Common_GameManager = function() {
	this.tileManager = null;
	this.mapManager = null;
	this.unitManager = null;
	this.instanceType = 0;
	this.tileManager = new $ZombieGame_Common_TileManager(this);
	this.mapManager = new $ZombieGame_Common_MapManager(this, 400, 400);
	this.unitManager = new $ZombieGame_Common_UnitManager(this);
};
$ZombieGame_Common_GameManager.prototype = {
	loadTiles: function(jsonTileMap, completed) {
		CommonClientLibraries.UIManager.CHelp.loadImageFromUrl(jsonTileMap.tileMapURL, Function.mkdel(this, function(image) {
			this.tileManager.loadTiles(jsonTileMap, image, completed);
		}));
	},
	init: function() {
		this.unitManager.init();
	},
	tick: function() {
		this.unitManager.tick();
	}
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Common.GameMap
var $ZombieGame_Common_GameMap = function(mapManager, jsonMap) {
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
$ZombieGame_Common_GameMap.prototype = {
	getTileAt: function(x, y) {
		return this.tileMap[x][y];
	},
	draw: function(context, tileX, tileY, wWidth, wHeight) {
		context.save();
		for (var x = tileX; x < wWidth; x++) {
			for (var y = tileY; y < wHeight; y++) {
				var tile = CommonLibraries.Extensions.getSafe($ZombieGame_Common_Tile).call(null, this.tileMap, x, y);
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
// ZombieGame.Common.GameMapLayout
var $ZombieGame_Common_GameMapLayout = function() {
	this.$1$GameMapField = null;
	this.$1$XField = 0;
	this.$1$YField = 0;
};
$ZombieGame_Common_GameMapLayout.prototype = {
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
// ZombieGame.Common.InstanceType
var $ZombieGame_Common_InstanceType = function() {
};
$ZombieGame_Common_InstanceType.prototype = { server: 0, client: 1 };
Type.registerEnum(global, 'ZombieGame.Common.InstanceType', $ZombieGame_Common_InstanceType, false);
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Common.MapManager
var $ZombieGame_Common_MapManager = function(gameManager, totalRegionWidth, totalRegionHeight) {
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
$ZombieGame_Common_MapManager.prototype = {
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
		var gameMap = new $ZombieGame_Common_GameMap(this, jsonMap);
		this.get_gameMaps()[gameMap.name] = gameMap;
		return gameMap;
	},
	addMapToRegion: function(name, x, y) {
		this.addMapToRegion$1(this.get_gameMaps()[name], x, y);
	},
	addMapToRegion$1: function(gameMap, x, y) {
		var $t2 = this.get_gameMapLayouts();
		var $t1 = new $ZombieGame_Common_GameMapLayout();
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
// ZombieGame.Common.Person
var $ZombieGame_Common_Person = function(gameManager) {
	$ZombieGame_Common_Unit.call(this, gameManager);
};
$ZombieGame_Common_Person.prototype = {
	init: function() {
		this.moveRate = 2.4;
		$ZombieGame_Common_Unit.prototype.init.call(this);
	},
	draw: function(context) {
		context.save();
		context.fillStyle = 'blue';
		context.fillRect(this.x - 13, this.y - 13, 26, 26);
		context.restore();
	}
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Common.Tile
var $ZombieGame_Common_Tile = function(canvas, x, y, jsonMap) {
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
$ZombieGame_Common_Tile.prototype = {
	get_key: function() {
		return $ZombieGame_Common_Tile.makeKey(this.$jsonMap.name, ss.Int32.div(this.tileMapX, this.$jsonMap.tileWidth), ss.Int32.div(this.tileMapY, this.$jsonMap.tileHeight));
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
		context.translate(_x + mapX * $ZombieGame_Common_ZombieGameConfig.tileSize, _y + mapY * $ZombieGame_Common_ZombieGameConfig.tileSize);
		//
		//            context.Translate(ZombieGameConfig.TileSize / 2, ZombieGameConfig.TileSize / 2);
		//
		//            //context.Rotate(fm);
		//
		//            context.Translate(-ZombieGameConfig.TileSize / 2, -ZombieGameConfig.TileSize / 2);
		context.drawImage(this.image.canvas, 0, 0);
		//
		//            context.StrokeStyle = "red";
		//
		//            context.StrokeRect(0, 0, ZombieGameConfig.TileSize, ZombieGameConfig.TileSize);
		//
		//            
		//
		//            switch (Collision) {
		//
		//            case CollisionType.Full:
		//
		//            context.FillStyle = "rgba(233,12,22,0.6)";
		//
		//            context.FillRect(0, 0, ZombieGameConfig.TileSize, ZombieGameConfig.TileSize);
		//
		//            break;
		//
		//            case CollisionType.RightHalf:
		//
		//            context.FillStyle = "rgba(233,12,22,0.6)";
		//
		//            context.FillRect(ZombieGameConfig.TileSize / 2, 0, ZombieGameConfig.TileSize / 2, ZombieGameConfig.TileSize);
		//
		//            break;
		//
		//            case CollisionType.TopHalf:
		//
		//            context.FillStyle = "rgba(233,12,22,0.6)";
		//
		//            context.FillRect(0, 0, ZombieGameConfig.TileSize, ZombieGameConfig.TileSize / 2);
		//
		//            break;
		//
		//            case CollisionType.LeftHalf:
		//
		//            context.FillStyle = "rgba(233,12,22,0.6)";
		//
		//            context.FillRect(0, 0, ZombieGameConfig.TileSize / 2, ZombieGameConfig.TileSize);
		//
		//            break;
		//
		//            case CollisionType.BottomHalf:
		//
		//            context.FillStyle = "rgba(233,12,22,0.6)";
		//
		//            context.FillRect(0, ZombieGameConfig.TileSize / 2, ZombieGameConfig.TileSize, ZombieGameConfig.TileSize / 2);
		//
		//            break;
		//
		//            }
		//todo enable when some sort of edit mode is enabled
		context.restore();
	}
};
$ZombieGame_Common_Tile.makeKey = function(name, x, y) {
	return String.format('{0}-{1}-{2}', name, x, y);
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Common.TileManager
var $ZombieGame_Common_TileManager = function(gameManager) {
	this.$myGameManager = null;
	this.$loadedTiles = null;
	this.$myGameManager = gameManager;
	this.$loadedTiles = {};
};
$ZombieGame_Common_TileManager.prototype = {
	loadTiles: function(jsonTileMap, tileImage, completed) {
		var canvas = CommonClientLibraries.CanvasInformation.create(tileImage);
		for (var x = 0; x < tileImage.width; x += jsonTileMap.tileWidth) {
			for (var y = 0; y < tileImage.height; y += jsonTileMap.tileHeight) {
				//load just the xy width*height of the canvas into a tile object for caching mostly. 
				var tile = new $ZombieGame_Common_Tile(canvas, x, y, jsonTileMap);
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
// ZombieGame.Common.Unit
var $ZombieGame_Common_Unit = function(gameManager) {
	this.$movingTowards = null;
	this.$myGameManager = null;
	this.x = 0;
	this.y = 0;
	this.moveRate = 0;
	this.updatePosition = null;
	this.$myGameManager = gameManager;
	this.moveRate = 2;
};
$ZombieGame_Common_Unit.prototype = {
	init: function() {
		this.updatePosition(this.x, this.y);
	},
	draw: function(context) {
	},
	moveTowards: function(x, y) {
		this.$movingTowards = CommonLibraries.Point.$ctor1(x, y);
		new $ZombieGame_Common_WaypointDeterminer(CommonLibraries.Point.$ctor1(this.x, this.y), CommonLibraries.Point.$ctor1(x, y), this.moveRate, this.$myGameManager.mapManager.get_collisionMap());
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
// ZombieGame.Common.UnitManager
var $ZombieGame_Common_UnitManager = function(gameManager) {
	this.$myGameManager = null;
	this.$characterCenterPadding = CommonLibraries.Point.$ctor1(150, 150);
	this.mainCharacter = null;
	this.mainCharacterUpdate = null;
	this.$myGameManager = gameManager;
};
$ZombieGame_Common_UnitManager.prototype = {
	draw: function(context) {
		this.mainCharacter.draw(context);
	},
	init: function() {
		var $t1 = new $ZombieGame_Common_Person(this.$myGameManager);
		$t1.x = 100;
		$t1.y = 170;
		$t1.updatePosition = this.mainCharacterUpdate;
		this.mainCharacter = $t1;
		this.mainCharacter.init();
	},
	tick: function() {
		this.mainCharacter.tick();
	}
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Common.Waypoint
var $ZombieGame_Common_Waypoint = function() {
	this.x = 0;
	this.y = 0;
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Common.WaypointDeterminer
var $ZombieGame_Common_WaypointDeterminer = function(start, end, moveRate, collisionMap) {
	this.$myCollisionMap = null;
	this.points = null;
	this.$myCollisionMap = collisionMap;
	var _x = start.x, _y = start.y;
	//[x][y]
	//
	//            switch (collisionMap[0][0]) {
	//
	//            case CollisionType.Empty:
	//
	//            break;
	//
	//            case CollisionType.Full:
	//
	//            break;
	//
	//            case CollisionType.RightHalf:
	//
	//            break;
	//
	//            case CollisionType.TopHalf:
	//
	//            break;
	//
	//            case CollisionType.LeftHalf:
	//
	//            break;
	//
	//            case CollisionType.BottomHalf:
	//
	//            break;
	//
	//            }
	//
	//            int _x=start.X, _y=start.Y;
	//
	//            
	//
	//            while (true) {
	//
	//            if (Math.Abs(end.X - start.X) < 6 && Math.Abs(end.Y - start.X) < 6) //6 chosen arbitrarily
	//
	//            break;
	//
	//            else {
	//
	//            var m = end.Negate(_x, _y).Normalize(moveRate);
	//
	//            _x += m.X;
	//
	//            _y += m.Y;
	//
	//            Points.Add(new Waypoint() {X = _x, Y = _y});
	//
	//            }
	//
	//            }
	//If area mouse clicked is empty, attempt to calculate path to coordinate
	if (this.$myCollisionMap[end.x][end.y] === 0) {
		var openList = [];
		var closedList = [];
		//Add start coord to openlist
		openList.add(new $ZombieGame_Common_AStarNode(0, (Math.abs(start.x - end.x) + Math.abs(start.y - end.y)) * $ZombieGame_Common_AStarNode.lateralCost, null, CommonLibraries.Point.$ctor1(start.x, start.y)));
		//While still nodes to search on frontier
		while (openList.length > 0) {
			var lowestCost = 2147483647;
			var currentNode = null;
			//Find lowest cost node and set it to current
			for (var $t1 = 0; $t1 < openList.length; $t1++) {
				var node = openList[$t1];
				if (node.totalCost < lowestCost) {
					lowestCost = node.totalCost;
					currentNode = node;
				}
			}
			//switch current node from open list to closed list
			openList.remove(currentNode);
			closedList.add(currentNode);
			//Build list of directly adjacent nodes that are walkable
			var eligibleAdjacent = [];
			var currentX = currentNode.coordinate.x;
			var currentY = currentNode.coordinate.y;
			//Column left of current node
			if (currentX - 1 >= 0) {
				if (this.$myCollisionMap[currentX - 1][currentY] === 0) {
				}
			}
		}
	}
};
$ZombieGame_Common_WaypointDeterminer.prototype = {
	tick: function() {
		return false;
	}
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Common.ZombieGameConfig
var $ZombieGame_Common_ZombieGameConfig = function() {
};
Type.registerClass(global, 'ZombieGame.Common.AStarNode', $ZombieGame_Common_AStarNode, Object);
Type.registerClass(global, 'ZombieGame.Common.GameManager', $ZombieGame_Common_GameManager, Object);
Type.registerClass(global, 'ZombieGame.Common.GameMap', $ZombieGame_Common_GameMap, Object);
Type.registerClass(global, 'ZombieGame.Common.GameMapLayout', $ZombieGame_Common_GameMapLayout, Object);
Type.registerClass(global, 'ZombieGame.Common.MapManager', $ZombieGame_Common_MapManager, Object);
Type.registerClass(global, 'ZombieGame.Common.Tile', $ZombieGame_Common_Tile, Object);
Type.registerClass(global, 'ZombieGame.Common.TileManager', $ZombieGame_Common_TileManager, Object);
Type.registerClass(global, 'ZombieGame.Common.Unit', $ZombieGame_Common_Unit, Object);
Type.registerClass(global, 'ZombieGame.Common.UnitManager', $ZombieGame_Common_UnitManager, Object);
Type.registerClass(global, 'ZombieGame.Common.Waypoint', $ZombieGame_Common_Waypoint, Object);
Type.registerClass(global, 'ZombieGame.Common.WaypointDeterminer', $ZombieGame_Common_WaypointDeterminer, Object);
Type.registerClass(global, 'ZombieGame.Common.ZombieGameConfig', $ZombieGame_Common_ZombieGameConfig, Object);
Type.registerClass(global, 'ZombieGame.Common.Person', $ZombieGame_Common_Person, $ZombieGame_Common_Unit);
$ZombieGame_Common_AStarNode.lateralCost = 10;
$ZombieGame_Common_AStarNode.diagonalCost = 14;
$ZombieGame_Common_ZombieGameConfig.tileSize = 32;
