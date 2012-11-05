////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.ClickMode
var $ZombieGame_Client_ClickMode = function() {
};
$ZombieGame_Client_ClickMode.prototype = { moveCharacter: 0, dragMap: 1 };
Type.registerEnum(global, 'ZombieGame.Client.ClickMode', $ZombieGame_Client_ClickMode, false);
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.ClientGameManager
var $ZombieGame_Client_ClientGameManager = function(game) {
	this.$myGame = null;
	this.$screenOffset = null;
	this.$2$WindowManagerField = null;
	this.gameMode = 0;
	this.clickMode = 0;
	this.scale = null;
	ZombieGame.Common.GameManager.call(this);
	this.$myGame = game;
	this.set_windowManager(new $ZombieGame_Client_WindowManager(this, 0, 0, 400, 225));
	this.$screenOffset = CommonLibraries.Point.$ctor1(0, 0);
	this.scale = CommonLibraries.Point.$ctor1(2, 2);
	this.clickMode = 0;
	this.unitManager.mainCharacterUpdate = Function.combine(this.unitManager.mainCharacterUpdate, Function.mkdel(this, function(x, y) {
		this.get_windowManager().centerAround(x, y);
	}));
};
$ZombieGame_Client_ClientGameManager.prototype = {
	get_windowManager: function() {
		return this.$2$WindowManagerField;
	},
	set_windowManager: function(value) {
		this.$2$WindowManagerField = value;
	},
	draw: function(context) {
		context.save();
		switch (this.gameMode) {
			case 0: {
				break;
			}
			case 1: {
				this.$screenOffset.x = ss.Int32.div(this.$myGame.screen.width, 2) - ss.Int32.div(this.get_windowManager().width * this.scale.x, 2);
				this.$screenOffset.y = ss.Int32.div(this.$myGame.screen.height, 2) - ss.Int32.div(this.get_windowManager().height * this.scale.y, 2);
				context.translate(this.$screenOffset.x, this.$screenOffset.y);
				this.$playDraw(context);
				break;
			}
		}
		context.restore();
	},
	$playDraw: function(context) {
		var wm = this.get_windowManager();
		var wX = Math.max(0, ss.Int32.div(wm.x, ZombieGame.Common.ZombieGameConfig.tileSize) - 3);
		var wY = Math.max(0, ss.Int32.div(wm.y, ZombieGame.Common.ZombieGameConfig.tileSize) - 3);
		var wWidth = wX + ss.Int32.div(wm.width, ZombieGame.Common.ZombieGameConfig.tileSize) + 6;
		var wHeight = wY + ss.Int32.div(wm.height, ZombieGame.Common.ZombieGameConfig.tileSize) + 6;
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
		pointer.x -= this.$screenOffset.x;
		pointer.y -= this.$screenOffset.y;
	}
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.Game
var $ZombieGame_Client_Game = function() {
	this.$clicking = false;
	this.$gameManager = null;
	this.$myClickState = null;
	ClientAPI.LampClient.call(this);
	this.$gameManager = new $ZombieGame_Client_ClientGameManager(this);
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
		ClientAPI.LampClient.prototype.init.call(this, players, context);
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
	mouseMove: function(screenPointer) {
		if (!this.$clicking) {
			return false;
		}
		var gamePointer = this.$getGamePointer(screenPointer);
		var tilePointer = this.$getTilePointer(gamePointer);
		switch (this.$gameManager.clickMode) {
			case 0: {
				if (this.$gameManager.get_windowManager().collides(gamePointer)) {
					this.$gameManager.unitManager.mainCharacter.moveTowards(gamePointer.x, gamePointer.y);
				}
				break;
			}
			case 1: {
				this.$gameManager.get_windowManager().centerAround(screenPointer.x, screenPointer.y);
				break;
			}
		}
		return false;
	},
	onClick: function(screenPointer) {
		this.$clicking = true;
		var gamePointer = this.$getGamePointer(screenPointer);
		var tilePointer = this.$getTilePointer(gamePointer);
		switch (this.$gameManager.clickMode) {
			case 0: {
				if (this.$gameManager.get_windowManager().collides(gamePointer)) {
					this.$gameManager.unitManager.mainCharacter.moveTowards(gamePointer.x, gamePointer.y);
				}
				break;
			}
		}
		return false;
	},
	$getGamePointer: function(screenPointer) {
		var gamePointer = CommonClientLibraries.UIManager.Pointer.clonePointer(screenPointer);
		this.$gameManager.offsetPointer(gamePointer);
		gamePointer.x = ss.Int32.div(gamePointer.x, this.$gameManager.scale.x);
		gamePointer.y = ss.Int32.div(gamePointer.y, this.$gameManager.scale.y);
		//the scale "offset"
		this.$gameManager.get_windowManager().offsetPointer(gamePointer);
		//the window offset
		return gamePointer;
	},
	$getTilePointer: function(gamePointer) {
		var tilePointer = CommonClientLibraries.UIManager.Pointer.clonePointer(gamePointer);
		tilePointer.x = ss.Int32.div(tilePointer.x, this.$gameManager.scale.x);
		tilePointer.y = ss.Int32.div(tilePointer.y, ZombieGame.Common.ZombieGameConfig.tileSize);
		//the scale "offset" 
		return tilePointer;
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
			keys[x][y] = ZombieGame.Common.Tile.makeKey(name, x, y);
		}
	}
	return keys;
};
$ZombieGame_Client_Game.$fakeJsonTileMap2 = function() {
	return { name: 'Pretty', tileWidth: ZombieGame.Common.ZombieGameConfig.tileSize, tileHeight: ZombieGame.Common.ZombieGameConfig.tileSize, tileMapURL: 'http://50.116.22.241:8881/lamp/Games/ZombieGame/assets/top.png' };
};
$ZombieGame_Client_Game.$fakeJsonTileMap = function() {
	return { name: 'Pretty2', tileWidth: ZombieGame.Common.ZombieGameConfig.tileSize, tileHeight: ZombieGame.Common.ZombieGameConfig.tileSize, tileMapURL: 'http://50.116.22.241:8881/lamp/Games/ZombieGame/assets/watertileset3qb2tg0.png' };
};
$ZombieGame_Client_Game.$fakeJsonMap2 = function() {
	return { mapWidth: 20, mapHeight: 16, name: 'Pretties', tileMap: $ZombieGame_Client_Game.$makeFakeMap('Pretty', 20, 16) };
};
$ZombieGame_Client_Game.$fakeJsonMap = function() {
	return { mapWidth: 12, mapHeight: 10, name: 'Pretties2', tileMap: $ZombieGame_Client_Game.$makeFakeMap('Pretty2', 12, 10) };
};
////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Client.GameMode
var $ZombieGame_Client_GameMode = function() {
};
$ZombieGame_Client_GameMode.prototype = { tileEdit: 0, play: 1 };
Type.registerEnum(global, 'ZombieGame.Client.GameMode', $ZombieGame_Client_GameMode, false);
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
		pointer.x += this.x;
		pointer.y += this.y;
	},
	collides: function(point) {
		return point.x > this.x && point.x < this.x + this.width && point.y > this.y && point.y < this.y + this.height;
	}
};
Type.registerClass(global, 'ZombieGame.Client.ClientGameManager', $ZombieGame_Client_ClientGameManager, ZombieGame.Common.GameManager);
Type.registerClass(global, 'ZombieGame.Client.Game', $ZombieGame_Client_Game, ClientAPI.LampClient);
Type.registerClass(global, 'ZombieGame.Client.WindowManager', $ZombieGame_Client_WindowManager, Object);
$ZombieGame_Client_Game.debugText = null;
