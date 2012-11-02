using System;
using System.Runtime.CompilerServices;
using CommonClientLibraries.UIManager;
namespace ZombieGame.Client
{
    public class WindowManager
    {
        private readonly GameManager myGameManager;
        [IntrinsicProperty]
        public int X { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }
        [IntrinsicProperty]
        public int Width { get; set; }
        [IntrinsicProperty]
        public int Height { get; set; }

        public WindowManager(GameManager gameManager, int x, int y, int width, int height)
        {
            myGameManager = gameManager;
            X = x;
            Y = y;
            Width = width;
            Height = height;
        }

        public void CenterAround(int x, int y)
        {
            X = Math.Max(x - Width / 2, 0);
            Y = Math.Max(y - Height / 2, 0);
        }

        public Pointer OffsetPointer(Pointer pointer)
        {
            return new Pointer(X + pointer.X, Y + pointer.Y, pointer);
        }
    }
}