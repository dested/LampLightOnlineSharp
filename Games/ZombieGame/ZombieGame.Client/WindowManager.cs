using System;
using System.Runtime.CompilerServices;
using CommonClientLibraries.UIManager;
using CommonLibraries;
namespace ZombieGame.Client
{
    public class WindowManager
    {
        private readonly ClientGameManager myGameManager;
        [IntrinsicProperty]
        public int X { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }
        [IntrinsicProperty]
        public int Width { get; set; }
        [IntrinsicProperty]
        public int Height { get; set; }

        public WindowManager(ClientGameManager gameManager, int x, int y, int width, int height)
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

        public void OffsetPointer(Pointer pointer)
        {
            pointer.X += X;
            pointer.Y += Y;
        }

        public bool Collides(Point point)
        {
            return point.X > X && point.X < X + Width && point.Y > Y && point.Y < Y + Height;
        }
    }
}