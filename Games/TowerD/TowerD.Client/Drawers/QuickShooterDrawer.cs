using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonLibraries;
namespace TowerD.Client.Drawers
{
    public class QuickShooterDrawer : UnitDrawer
    {
        private int curSpeed;
        private ParticleSystem system;
        [IntrinsicProperty]
        public Color Color { get; set; }

        public QuickShooterDrawer(Color color)
        {
            Color = color;
        }

        #region UnitDrawer Members

        public void Init()
        {
            system = new ParticleSystem();

            system.Position = new Point(300, 190);

            switch (Color) {
                case Color.Red:
                    system.StartColor = new int[] {163, 0, 0, 1};
                    system.EndColor = new int[] {220, 0, 0, 1};
                    break;
                case Color.Blue:
                    system.StartColor = new int[] {0, 0, 255, 1};
                    system.EndColor = new int[] {0, 0, 173, 1};
                    break;
                case Color.Green:
                    system.StartColor = new int[] {53, 244, 73, 1};
                    system.EndColor = new int[] {23, 104, 31, 1};
                    break;
                case Color.Yellow:
                    system.StartColor = new int[] {255, 212, 0, 1};
                    system.EndColor = new int[] {145, 121, 0, 1};
                    break;
            }
            system.Size = 30;
            system.SizeRandom = 2;
            system.MaxParticles = 30;
            system.LifeSpan = 5;
            system.Speed = 1;
            system.Gravity = new DoublePoint(0, 0);

            system.Init();

            curSpeed = system.Speed;
        }

        public void Tick()
        {
            system.Update(1);
        }

        public void Draw(CanvasContext2D context, int x, int y)
        {
            system.Position.X = x;
            system.Position.Y = y;
            system.Render(context);
        }

        public bool Destroy()
        {
            system.Active = false;
            return system.Particles.Count == 0;
        }

        public void ResetSpeed()
        {
            system.Speed = curSpeed;
        }

        public void MagnifySpeed(double rate)
        {
            system.Speed = (int) ( curSpeed * rate );
        }

        #endregion
    }
}