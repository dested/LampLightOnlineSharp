////////////////////////////////////////////////////////////////////////////////
// ZombieGame.Server.Game
var $ZombieGame_Server_Game = function() {
	MMServerAPI.LampServer.call(this);
};
$ZombieGame_Server_Game.prototype = {
	init: function(players) {
		MMServerAPI.LampServer.prototype.init.call(this, players);
	},
	gameTick: function() {
	},
	executeAction: function(action) {
		var zAction = action;
		switch (zAction.zombieActionType) {
			case 0: {
				break;
			}
		}
		MMServerAPI.LampServer.prototype.executeAction.call(this, action);
	}
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
// ZombieGame.Server.ServerGameManager
var $ZombieGame_Server_ServerGameManager = function() {
	ZombieGame.Common.GameManager.call(this);
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
Type.registerClass(global, 'ZombieGame.Server.Game', $ZombieGame_Server_Game, MMServerAPI.LampServer);
Type.registerClass(global, 'ZombieGame.Server.ServerGameManager', $ZombieGame_Server_ServerGameManager, ZombieGame.Common.GameManager);
Type.registerClass(global, 'ZombieGame.Server.ZombieLampAction', $ZombieGame_Server_ZombieLampAction);
Type.registerClass(global, 'ZombieGame.Server.MovePlayerZombieLampAction', $ZombieGame_Server_MovePlayerZombieLampAction);
