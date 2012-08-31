using System;
using System.Runtime.CompilerServices;

namespace SudokuCommon
{
    [Serializable]
    public class SudokuPlayerNewNumberMessage
    {
        [IntrinsicProperty]
        public int X { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }
        [IntrinsicProperty]
        public int Number { get; set; }
    }
}