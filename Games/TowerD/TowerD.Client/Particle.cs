using System.Runtime.CompilerServices;
using CommonLibraries;
namespace TowerD.Client
{
    public class Particle
    {
        [IntrinsicProperty]
        public DoublePoint Position { get; set; }
        [IntrinsicProperty]
        public DoublePoint Direction { get; set; }
        [IntrinsicProperty]
        public double Sharpness { get; set; }
        [IntrinsicProperty]
        public double Size { get; set; }
        [IntrinsicProperty]
        public double TimeToLive { get; set; }
        [IntrinsicProperty]
        public double SizeSmall { get; set; }
        [IntrinsicProperty]
        public double[] Color { get; set; }
        [IntrinsicProperty]
        public double[] DeltaColor { get; set; }
        [IntrinsicProperty]
        public string DrawColor { get; set; }
        [IntrinsicProperty]
        public string DrawColorTransparent { get; set; }

        public Particle()
        {
            Position = new DoublePoint(0, 0);
            Direction = new DoublePoint(0, 0);
            DeltaColor = new double[4];
            Color = new double[4];
        }
    }
}