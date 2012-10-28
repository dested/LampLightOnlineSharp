using System;
namespace CommonLibraries
{
    [Serializable]
    public class DoublePoint
    {
        public double X { get; set; }
        public double Y { get; set; }

        public DoublePoint(double x, double y)
        {
            X = x;
            Y = y;
        }

        public DoublePoint(DoublePoint pos)
        {
            X = pos.X;
            Y = pos.Y;
        }

        public DoublePoint Offset(DoublePoint windowLocation)
        {
            return new DoublePoint(X + windowLocation.X, Y + windowLocation.Y);
        }

        public DoublePoint Negate(DoublePoint windowLocation)
        {
            return new DoublePoint(X - windowLocation.X, Y - windowLocation.Y);
        }

        public DoublePoint Negate(int x, int y)
        {
            return new DoublePoint(X - x, Y - y);
        }

        public static implicit operator DoublePoint(Point p)
        {
            return new DoublePoint(p.X, p.Y);
        }

        public string String()
        {
            return string.Format("{{X:{0}, Y:{1}}}", X, Y);
        }

        public DoublePoint Multiply(double scaleFactor)
        {
            this.X *= scaleFactor;
            this.Y *= scaleFactor;
            return this;
        }

        public DoublePoint Add(DoublePoint scaleFactor)
        {
            this.X += scaleFactor.X;
            this.Y += scaleFactor.Y;
            return this;
        }
        public DoublePoint Add(double scaleFactor)
        {
            this.X += scaleFactor;
            this.Y += scaleFactor;
            return this;
        }
    }
}