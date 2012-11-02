using System;
using CommonLibraries;
namespace CommonClientLibraries.UIManager
{
    [Serializable]
    public class Pointer : Point
    {
        public int Delta { get; set; }
        public bool Right { get; set; }

        public Pointer(int x, int y, int delta = 0, bool right = false) : base(x, y)
        {
            Delta = delta;
            Right = right;
        }

        public Pointer(int x, int y, Pointer pointer) : base(x, y)
        {
            Delta = pointer.Delta;
            Right = pointer.Right;
        }
    }
}