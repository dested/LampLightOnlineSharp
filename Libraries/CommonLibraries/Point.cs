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
            X += (int) scaleFactor.X;
            Y += (int) scaleFactor.Y;
            return this;
        }

        public DoublePoint Add(double scaleFactor)
        {
            X += (int) scaleFactor;
            Y += (int) scaleFactor;
            return this;
        }

        public Point Clone()
        {
            return new Point(X, Y);
        }

        /// name comes from the adobe api
        /// http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/geom/Point.html
        public Point Normalize(double scale)
        {
            var norm = Math.Sqrt(X * X + Y * Y);
            if (norm != 0) {
                X = (int) ( scale * X / norm );
                Y = (int) ( scale * Y / norm );
            }
            return this;
        }
    }
}