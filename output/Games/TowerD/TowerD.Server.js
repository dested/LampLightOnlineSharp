////////////////////////////////////////////////////////////////////////////////
// TowerD.Server.Sudoku
var $TowerD_Server_Sudoku = function() {
	this.players = null;
	ServerAPI.LampServer.call(this);
};
$TowerD_Server_Sudoku.prototype = {
	init: function(players) {
		for (var index = 0; index < players.length; index++) {
			var lampPlayer = players[index];
			lampPlayer.onMessageRecieved = Function.combine(lampPlayer.onMessageRecieved, Function.mkdel(this, this.$playerUpdateState));
			this.players[lampPlayer] = new $TowerD_Server_SudokuServerPlayer();
		}
	},
	$playerUpdateState: function(ev) {
		var data = ev.getData(TowerD.Common.SudokuPlayerMessage).call(ev);
		switch (data.messageType) {
			case 0: {
				var nnMessageInfo = data.getMessageInfo(TowerD.Common.SudokuPlayerNewNumberMessage).call(data);
				this.players[ev.player].numberSet[nnMessageInfo.x][nnMessageInfo.y] = nnMessageInfo.number;
				var $t1 = Object.getObjectEnumerator(this.players);
				try {
					while ($t1.moveNext()) {
						var player = $t1.get_current();
						player.key.sendMessage(SudokuCommon.SudokuServerMessage).call(player.key, new SudokuCommon.SudokuServerMessage(new TowerD.Common.SudokuServerUpdateNumber(player.value, nnMessageInfo.x, nnMessageInfo.y)));
					}
				}
				finally {
					$t1.dispose();
				}
				break;
			}
		}
	}
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Server.SudokuServerPlayer
var $TowerD_Server_SudokuServerPlayer = function() {
	TowerD.Common.SudokuPlayer.call(this);
};
Type.registerClass(global, 'TowerD.Server.Sudoku', $TowerD_Server_Sudoku, ServerAPI.LampServer);
Type.registerClass(global, 'TowerD.Server.SudokuServerPlayer', $TowerD_Server_SudokuServerPlayer, TowerD.Common.SudokuPlayer);
