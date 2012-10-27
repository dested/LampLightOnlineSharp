namespace SudokuCommon
{
    public class SudokuServerUpdateNumber
    {
        public SudokuPlayer Player { get; set; }
        public int X { get; set; }
        public int Y { get; set; }

        public SudokuServerUpdateNumber(SudokuPlayer player, int x, int y)
        {
            Player = player;
            X = x;
            Y = y;
        }
    }
}