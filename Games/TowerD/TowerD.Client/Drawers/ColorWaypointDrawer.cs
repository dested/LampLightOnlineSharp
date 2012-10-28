using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonLibraries;
namespace TowerD.Client.Drawers
{
    public class ColorWaypointDrawer : WaypointDrawer
    {
        private readonly Point myScale;
        private List<ParticleSystem> systems;
        [IntrinsicProperty]
        public Color StartColor { get; set; }
        [IntrinsicProperty]
        public Color EndColor { get; set; }

        public ColorWaypointDrawer(Color startColor, Color endColor, WaypointMap map,Point scale)
        {
            myScale = scale;
            StartColor = startColor;
            EndColor = endColor;
            Map = map;
        }

        #region WaypointDrawer Members

        public WaypointMap Map { get; set; }

        public void Init()
        {
            systems = new List<ParticleSystem>();

            var items = new List<DoublePoint>(Map.Travel(30, myScale));

            for (int index = 0; index < items.Count; index++) {
                var point = items[index];
                var system = new ParticleSystem();

                int[] StartColors = null;
                int[] EndColors = null;
                int[] StartColors2 = null;
                int[] EndColors2 = null;

                switch (StartColor) {
                    case Color.Red:
                        StartColors = new int[] {163, 0, 0, 1};
                        EndColors = new int[] {220, 0, 0, 1};
                        break;
                    case Color.Blue:
                        StartColors = new int[] {0, 0, 255, 1};
                        EndColors = new int[] {0, 0, 173, 1};
                        break;
                    case Color.Green:
                        StartColors = new int[] {53, 244, 73, 1};
                        EndColors = new int[] {23, 104, 31, 1};
                        break;
                    case Color.Yellow:
                        StartColors = new int[] {255, 212, 0, 1};
                        EndColors = new int[] {145, 121, 0, 1};
                        break;
                }

                switch (EndColor) {
                    case Color.Red:
                        StartColors2 = new int[] {163, 0, 0, 1};
                        EndColors2 = new int[] {220, 0, 0, 1};
                        break;
                    case Color.Blue:
                        StartColors2 = new int[] {0, 0, 255, 1};
                        EndColors2 = new int[] {0, 0, 173, 1};
                        break;
                    case Color.Green:
                        StartColors2 = new int[] {53, 244, 73, 1};
                        EndColors2 = new int[] {23, 104, 31, 1};
                        break;
                    case Color.Yellow:
                        StartColors2 = new int[] {255, 212, 0, 1};
                        EndColors2 = new int[] {145, 121, 0, 1};
                        break;
                }

                StartColors[0] = (int)(StartColors[0] + (StartColors2[0] - StartColors[0]) * ((double)index / items.Count));
                StartColors[1] = (int)(StartColors[1] + (StartColors2[1] - StartColors[1]) * ((double)index / items.Count));
                StartColors[2] = (int)(StartColors[2] + (StartColors2[2] - StartColors[2]) * ((double)index / items.Count));
                StartColors[3] = (int)(StartColors[3] + (StartColors2[3] - StartColors[3]) * ((double)index / items.Count));


                EndColors[0] = (int)(EndColors[0] + (EndColors2[0] - EndColors[0]) * ((double)index / items.Count));
                EndColors[1] = (int)(EndColors[1] + (EndColors2[1] - EndColors[1]) * ((double)index / items.Count));
                EndColors[2] = (int)(EndColors[2] + (EndColors2[2] - EndColors[2]) * ((double)index / items.Count));
                EndColors[3] = (int)(EndColors[3] + (EndColors2[3] - EndColors[3]) * ((double)index / items.Count));

                system.StartColor = StartColors;
                system.EndColor = EndColors;

                system.Size = 7;
                system.MaxParticles = 10;
                system.LifeSpan = 10;
                system.Speed = 1;
                system.Gravity = new DoublePoint(0, 0);
                system.Position = point.ToPoint();
                system.Init();
                systems.Add(system);
            }
        }

        public void Tick()
        {
            foreach (var particleSystem in systems) {
                particleSystem.Update(1);
            }
        }

        public void Draw(CanvasContext2D context, int x, int y)
        {
            foreach (var particleSystem in systems) {
                particleSystem.Render(context);
            }
            /*            system.Position.X = x;
                        system.Position.Y = y;*/
        }

        #endregion
    }
}