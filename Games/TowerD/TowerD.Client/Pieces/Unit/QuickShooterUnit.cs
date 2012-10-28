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
        private List<Point> travelPoints;
        public WaypointMap Map { get; set; }
        public Color Color { get; set; }

        private int spinUpTimer;
        private int spinDownTimer;
        public int SpinUpTime { get; set; }
        public int SpinDownTime { get; set; }

        public QuickShooterUnit(WaypointMap map, Point scale, Color color)
        {
            Map = map;
            Color = color;
            travelPoints = new List<Point>(map.Travel(150, scale));

            Drawer = new QuickShooterDrawer(color);
            Drawer.Init();

            spinUpTimer = 0;
            spinDownTimer = 0;

            SpinDownTime = 20*4;
            SpinUpTime = 20*2;
        } 

        public List<Weapon> Weapons { get; set; }
        public List<Shield> Shields { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public UnitDrawer Drawer { get; set; }

        public bool Tick()
        {
            var okay = true;
            Point p;
            if (ind == 0)
            {
                p = travelPoints[ind];
                X = p.X;
                Y = p.Y;
                if (spinUpTimer++ < SpinUpTime) {
                    Drawer.MagnifySpeed(2.95);
                    
                    okay = true;
                } else ind++;
            }
            else if (ind == travelPoints.Count - 1)
            {
                p = travelPoints[ind];
                X = p.X;
                Y = p.Y;
                if (spinDownTimer++ < SpinDownTime)
                {
                    Drawer.MagnifySpeed(3.8);

                    okay = true;
                }else {


                    okay = !Drawer.Destroy();
                }
            }
            else {
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
         
    }
}