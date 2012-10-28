using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonClientLibraries;
using CommonLibraries;
namespace TowerD.Client
{
    public class Particle
    {
        private static CanvasInformation info = CanvasInformation.Create(300, 300);
        private int curGradIndex = 0;
        private List<Gradient> grads = new List<Gradient>();
        [IntrinsicProperty]
        public ParticleSystem System { get; set; }
        [IntrinsicProperty]
        public Point Position { get; set; }
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
            Position = new Point(0, 0);
            Direction = new DoublePoint(0, 0);
            DeltaColor = new double[4];
            Color = new double[4];
        }

        public void BuildCache(int delta)
        {
            return;
            var timetolive = TimeToLive;

            while (progress(delta)) {
                string key = DrawColor + Size /*+ Sharpness*/;
                if (!System.cachedGrads.ContainsKey(key)) {
                    if (Game.DebugText[0].Falsey()) Game.DebugText[0] = 0;
                    Game.DebugText[0] = (int) Game.DebugText[0] + 1;

                    var grad = obtainGradient(info.Context, this);
                    grads.Add((Gradient) grad);

                    System.cachedGrads[key] = (Gradient) grad;
                } else grads.Add(System.cachedGrads[key]);
            }
            TimeToLive = timetolive;
        }

        private bool progress(int delta)
        {
            if (TimeToLive <= 0)
                return false;
            // Calculate the new direction based on gravity
            TimeToLive -= delta;

            // Update Colors based on delta
            var r = Color[0] += ( DeltaColor[0] * delta );
            var g = Color[1] += ( DeltaColor[1] * delta );
            var b = Color[2] += ( DeltaColor[2] * delta );
            var a = Color[3] += ( DeltaColor[3] * delta );

            // Calculate the rgba string to draw.
            var draw = new List<string>();
            draw.Add(( "rgba(" + ( r > 255 ? 255 : r < 0 ? 0 : ~~(int) r ) ));
            draw.Add(( g > 255 ? 255 : g < 0 ? 0 : ~~(int) g ).ToString());
            draw.Add(( b > 255 ? 255 : b < 0 ? 0 : ~~(int) b ).ToString());
            draw.Add(( a > 1 ? "1" : a < 0 ? "0" : a.ToFixed(2) ) + ")");
            DrawColor = draw.Join(",");
            draw.RemoveAt(3);
            draw.Add("0)");
            DrawColorTransparent = draw.Join(",");
            return true;
        }

        public bool Update(int delta)
        {
            if (TimeToLive <= 0)
                return false;

            Direction = Direction.Add(System.Gravity);
            Position = Position.Add(Direction);

            return progress(delta);
            return true;
        }

        public void Render(CanvasContext2D context)
        {
            var x = Position.X;
            var y = Position.Y;

            context.Save();

            context.Translate(x, y);

            drawGrad(context, obtainGradient(context, this), Size);
            //   drawGrad(context, grads[curGradIndex++], Size);

            context.Restore();
        }

        private static void drawGrad(CanvasContext2D context, object radgrad, double size)
        {
            context.FillStyle = radgrad;
            context.FillRect(0, 0, size, size);
        }

        private object obtainGradient(CanvasContext2D context, Particle particle)
        {
            var halfSize = (int) particle.Size >> 1;

            /*   string key = halfSize + particle.DrawColor + particle.SizeSmall;
            if (grads.ContainsKey(key)) {
                return grads[key];
            }*/

            if (Game.DRAWFAST)
                return particle.DrawColor;

            var radgrad = context.CreateRadialGradient(halfSize, halfSize, particle.SizeSmall, halfSize, halfSize, halfSize);
            //var radgrad = context.CreateLinearGradient(halfSize, halfSize, particle.SizeSmall, halfSize);
            radgrad.AddColorStop(0, particle.DrawColor);
            radgrad.AddColorStop(1, particle.DrawColorTransparent); //Super cool if you change these values (and add more Color stops)
            return /*grads[key]=*/ radgrad;
        }
    }
}