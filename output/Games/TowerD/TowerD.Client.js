////////////////////////////////////////////////////////////////////////////////
// SudokuClient.SudokuClientPlayer
var $SudokuClient_SudokuClientPlayer = function() {
	SudokuCommon.SudokuPlayer.call(this);
};
////////////////////////////////////////////////////////////////////////////////
// SudokuServer.Sudoku
var $SudokuServer_Sudoku = function() {
	ClientAPI.LampClient.call(this);
};
$SudokuServer_Sudoku.prototype = {
	init: function(players) {
	}
};
Type.registerClass(global, 'SudokuClient.SudokuClientPlayer', $SudokuClient_SudokuClientPlayer, SudokuCommon.SudokuPlayer);
Type.registerClass(global, 'SudokuServer.Sudoku', $SudokuServer_Sudoku, ClientAPI.LampClient);
