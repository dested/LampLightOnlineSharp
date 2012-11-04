using System;
using CommonLibraries;
namespace CommonClientLibraries.UIManager
{
    [Serializable]
    public class Pointer : Point
    {
        public int WheelDelta { get; set; }
        public bool Right { get; set; }

        public Pointer(int x, int y, int delta = 0, bool right = false) : base(x, y)
        {
            WheelDelta = delta;
            Right = right;
        }

        public Pointer(int x, int y, Pointer pointer) : base(x, y)
        {
            WheelDelta = pointer.WheelDelta;
            Right = pointer.Right;
        }

        public Pointer ClonePointer()
        { 
            return new Pointer(X, Y,WheelDelta,Right);
      
        }
    }
}