using System.Collections.Generic;
using System.Html.Media.Graphics;
using CommonLibraries;
using TowerD.Client.Drawers;
using TowerD.Client.Pieces.Shields;
using TowerD.Client.Pieces.Weapons;
namespace TowerD.Client.Pieces.Units
{
    public class QuickShooterUnit : Unit
    {
        private int ind;
        private int spinDownTimer;
        private int spinUpTimer;
        private List<Point> travelPoints;
        public int SpinUpTime { get; set; }
        public int SpinDownTime { get; set; }

        public QuickShooterUnit(List<Point> map, Kingdom kingdom)
        {
            Kingdom = kingdom;
            travelPoints = map;
            Weapons = new List<Weapon>();
            Shields = new List<Shield>();

            Weapons.Add(new GunWeapon(this));

            Drawer = new QuickShooterDrawer(kingdom.Color);
            Drawer.Init();

            spinUpTimer = 0;
            spinDownTimer = 0;

            SpinDownTime = (int) ( 20 * 1.5 );
            SpinUpTime = 20 * 1;
        }

        #region Unit Members

        public List<Weapon> Weapons { get; set; }
        public List<Shield> Shields { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public UnitDrawer Drawer { get; set; }
        public Kingdom Kingdom { get; set; }

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

            foreach (var weapon in Weapons) {
                weapon.Tick();
            }

            Drawer.Tick();
            return okay;
        }

        public void Draw(CanvasContext2D context, int x, int y)
        {
            Drawer.Draw(context, X, Y);
            foreach (var weapon in Weapons) {
                weapon.Draw(context, X, Y);
            }
        }

        #endregion
    }
}