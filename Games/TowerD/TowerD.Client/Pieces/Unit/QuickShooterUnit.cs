using System.Collections.Generic;
using System.Html.Media.Graphics;
using CommonLibraries;
using TowerD.Client.Drawers;
using TowerD.Client.Pieces.Shields;
using TowerD.Client.Pieces.Weapons;
namespace TowerD.Client.Pieces.Unit
{
    public class QuickShooterUnit : Unit
    {
        private int ind;
        private int spinDownTimer;
        private int spinUpTimer;
        private List<Point> travelPoints;
        public Color Color { get; set; }
        public int SpinUpTime { get; set; }
        public int SpinDownTime { get; set; }

        public QuickShooterUnit(List<Point> map, Color color)
        {
            Color = color;
            travelPoints = map;

            Drawer = new QuickShooterDrawer(color);
            Drawer.Init();

            spinUpTimer = 0;
            spinDownTimer = 0;

            SpinDownTime = (int) ( 20 * 2.5 );
            SpinUpTime = 20 * 2;
        }

        #region Unit Members

        public List<Weapon> Weapons { get; set; }
        public List<Shield> Shields { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public UnitDrawer Drawer { get; set; }

        public bool Tick()
        {
            bool okay;
            Point p;
            if (ind == 0) {
                p = travelPoints[ind];
                X = p.X;
                Y = p.Y;
                if (spinUpTimer++ < SpinUpTime) {
                    Drawer.MagnifySpeed(5.95);

                    okay = true;
                } else {
                    ind++;
                    okay = true;
                }
            } else if (ind == travelPoints.Count - 1) {
                p = travelPoints[ind];
                X = p.X;
                Y = p.Y;
                if (spinDownTimer++ < SpinDownTime) {
                    Drawer.MagnifySpeed(7.2);

                    okay = true;
                } else okay = !Drawer.Destroy();
            } else {
                Drawer.ResetSpeed();

                p = travelPoints[ind++];
                X = p.X;
                Y = p.Y;
                okay = true;
            }

            Drawer.Tick();
            return okay;
        }

        public void Draw(CanvasContext2D context, int x, int y)
        {
            Drawer.Draw(context, X, Y);
        }

        #endregion
    }
}