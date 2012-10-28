using System;
namespace CommonLibraries
{
    [Serializable]
    public class Point
    {
        public int X { get; set; }
        public int Y { get; set; }

        public Point(int x, int y)
        {
            X = x;
            Y = y;
        }

        public Point(Point pos)
        {
            X = pos.X;
            Y = pos.Y;
        }

        public Point Offset(Point windowLocation)
        {
            return new Point(X + windowLocation.X, Y + windowLocation.Y);
        }

        public Point Negate(Point windowLocation)
        {
            return new Point(X - windowLocation.X, Y - windowLocation.Y);
        }

        public Point Negate(int x, int y)
        {
            return new Point(X - x, Y - y);
        }

        public void Set(int x, int y)
        {
            X = x;
            Y = y;
        }
        public Point Add(DoublePoint scaleFactor)
        {
            this.X += (int)scaleFactor.X;
            this.Y += (int)scaleFactor.Y;
            return this;
        }
        public DoublePoint Add(double scaleFactor)
        {
            this.X += (int)scaleFactor;
            this.Y += (int)scaleFactor;
            return this;
        }

    }
}