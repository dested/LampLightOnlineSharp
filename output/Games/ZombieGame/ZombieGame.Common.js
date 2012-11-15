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
	this.tileManager = new $ZombieGame_Common_TileManager(this);
	this.mapManager = new $ZombieGame_Common_MapManager(this, 400, 400);
	this.unitManager = new $ZombieGame_Common_UnitManager(this);
};
$ZombieGame_Common_GameManager.prototype = {
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
			var tile = this.$myMapManager.myGameManager.tileManager.getTileByKey(key);
			this.tileMap[x][y] = tile;
			this.collisionMap[x][y] = tile.get_collision();
		}
	}
};
$ZombieGame_Common_GameMap.prototype = {
	getTileAt: function(x, y) {
		return this.tileMap[x][y];
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
// ZombieGame.Common.MapManager
var $ZombieGame_Common_MapManager = function(gameManager, totalRegionWidth, totalRegionHeight) {
	this.myGameManager = null;
	this.myTotalRegionHeight = 0;
	this.myTotalRegionWidth = 0;
	this.$1$GameMapsField = null;
	this.$1$CollisionMapField = null;
	this.$1$GameMapLayoutsField = null;
	this.myGameManager = gameManager;
	this.myTotalRegionWidth = totalRegionWidth;
	this.myTotalRegionHeight = totalRegionHeight;
	this.set_gameMaps({});
	this.set_gameMapLayouts([]);
	this.set_collisionMap(new Array(this.myTotalRegionWidth));
	for (var x = 0; x < this.myTotalRegionWidth; x++) {
		this.get_collisionMap()[x] = new Array(this.myTotalRegionHeight);
		for (var y = 0; y < this.myTotalRegionHeight; y++) {
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
	}
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Common.MovePlayerZombieLampAction
var $ZombieGame_Common_MovePlayerZombieLampAction = function() {
};
$ZombieGame_Common_MovePlayerZombieLampAction.createInstance = function() {
	return $ZombieGame_Common_MovePlayerZombieLampAction.$ctor();
};
$ZombieGame_Common_MovePlayerZombieLampAction.$ctor = function() {
	var $this = $ZombieGame_Common_ZombieLampAction.$ctor();
	$this.x = 0;
	$this.y = 0;
	$this.messageChannel = null;
	$this.channel = $this.messageChannel;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Common.Person
var $ZombieGame_Common_Person = function(gameManager) {
	this.lampPlayer = null;
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
var $ZombieGame_Common_Tile = function(x, y, jsonMap) {
	this.$jsonMap = null;
	this.tileMapY = 0;
	this.tileMapX = 0;
	this.$1$CollisionField = 0;
	this.$jsonMap = jsonMap;
	this.tileMapX = x;
	this.tileMapY = y;
	this.set_collision(this.$randomCollision());
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
	}
};
$ZombieGame_Common_Tile.makeKey = function(name, x, y) {
	return String.format('{0}-{1}-{2}', name, x, y);
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Common.TileManager
var $ZombieGame_Common_TileManager = function(gameManager) {
	this.$myGameManager = null;
	this.loadedTiles = null;
	this.$myGameManager = gameManager;
	this.loadedTiles = {};
};
$ZombieGame_Common_TileManager.prototype = {
	loadTiles: function(jsonTileMap, completed) {
		var height = jsonTileMap.mapHeight * jsonTileMap.tileHeight;
		var width = jsonTileMap.mapWidth * jsonTileMap.tileWidth;
		for (var x = 0; x < width; x += jsonTileMap.tileWidth) {
			for (var y = 0; y < height; y += jsonTileMap.tileHeight) {
				//load just the xy width*height of the canvas into a tile object for caching mostly. 
				var tile = new $ZombieGame_Common_Tile(x, y, jsonTileMap);
				//store each tile in a hash of name-x-y
				this.loadedTiles[tile.get_key()] = tile;
			}
		}
		completed();
	},
	getTileByKey: function(key) {
		return this.loadedTiles[key];
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
		if (ss.isValue(this.updatePosition)) {
			this.updatePosition(this.x, this.y);
		}
	},
	draw: function(context) {
	},
	moveTowards: function(x, y) {
		this.$movingTowards = CommonLibraries.Point.$ctor1(x, y);
		//new WaypointDeterminer(new Point(X, Y), new Point(x, y), MoveRate, myGameManager.MapManager.CollisionMap);
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
				if (ss.isValue(this.updatePosition)) {
					this.updatePosition(this.x, this.y);
				}
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
// ZombieGame.Common.ZombieActionType
var $ZombieGame_Common_ZombieActionType = function() {
};
$ZombieGame_Common_ZombieActionType.prototype = { movePlayer: 0 };
Type.registerEnum(global, 'ZombieGame.Common.ZombieActionType', $ZombieGame_Common_ZombieActionType, false);
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Common.ZombieGameConfig
var $ZombieGame_Common_ZombieGameConfig = function() {
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Common.ZombieLampAction
var $ZombieGame_Common_ZombieLampAction = function() {
};
$ZombieGame_Common_ZombieLampAction.$ctor = function() {
	var $this = CommonAPI.LampAction.$ctor();
	$this.zombieActionType = 0;
	return $this;
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
Type.registerClass(global, 'ZombieGame.Common.ZombieLampAction', $ZombieGame_Common_ZombieLampAction);
Type.registerClass(global, 'ZombieGame.Common.MovePlayerZombieLampAction', $ZombieGame_Common_MovePlayerZombieLampAction);
Type.registerClass(global, 'ZombieGame.Common.Person', $ZombieGame_Common_Person, $ZombieGame_Common_Unit);
$ZombieGame_Common_AStarNode.lateralCost = 10;
$ZombieGame_Common_AStarNode.diagonalCost = 14;
$ZombieGame_Common_ZombieGameConfig.tileSize = 32;
