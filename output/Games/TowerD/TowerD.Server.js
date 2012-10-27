////////////////////////////////////////////////////////////////////////////////
// SudokuServer.Sudoku
var $SudokuServer_Sudoku = function() {
	this.players = null;
	ServerAPI.LampServer.call(this);
};
$SudokuServer_Sudoku.prototype = {
	init: function(players) {
		for (var index = 0; index < players.length; index++) {
			var lampPlayer = players[index];
			lampPlayer.onMessageRecieved = Function.combine(lampPlayer.onMessageRecieved, Function.mkdel(this, this.$playerUpdateState));
			this.players[lampPlayer] = new $SudokuServer_SudokuServerPlayer();
		}
	},
	$playerUpdateState: function(ev) {
		var data = ev.getData(SudokuCommon.SudokuPlayerMessage).call(ev);
		switch (data.messageType) {
			case 0: {
				var nnMessageInfo = data.getMessageInfo(SudokuCommon.SudokuPlayerNewNumberMessage).call(data);
				this.players[ev.player].numberSet[nnMessageInfo.x][nnMessageInfo.y] = nnMessageInfo.number;
				var $t1 = Object.getObjectEnumerator(this.players);
				try {
					while ($t1.moveNext()) {
						var player = $t1.get_current();
						player.key.sendMessage(SudokuCommon.SudokuServerMessage).call(player.key, new SudokuCommon.SudokuServerMessage(new SudokuCommon.SudokuServerUpdateNumber(player.value, nnMessageInfo.x, nnMessageInfo.y)));
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
// SudokuServer.SudokuServerPlayer
var $SudokuServer_SudokuServerPlayer = function() {
	SudokuCommon.SudokuPlayer.call(this);
};
Type.registerClass(global, 'SudokuServer.Sudoku', $SudokuServer_Sudoku, ServerAPI.LampServer);
Type.registerClass(global, 'SudokuServer.SudokuServerPlayer', $SudokuServer_SudokuServerPlayer, SudokuCommon.SudokuPlayer);
