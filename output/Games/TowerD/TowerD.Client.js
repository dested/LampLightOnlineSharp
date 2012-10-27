////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Game
var $TowerD_Client_Game = function() {
	ClientAPI.LampClient.call(this);
};
$TowerD_Client_Game.prototype = {
	init: function(players) {
	}
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.SudokuClientPlayer
var $TowerD_Client_SudokuClientPlayer = function() {
	TowerD.Common.SudokuPlayer.call(this);
};
Type.registerClass(global, 'TowerD.Client.Game', $TowerD_Client_Game, ClientAPI.LampClient);
Type.registerClass(global, 'TowerD.Client.SudokuClientPlayer', $TowerD_Client_SudokuClientPlayer, TowerD.Common.SudokuPlayer);
