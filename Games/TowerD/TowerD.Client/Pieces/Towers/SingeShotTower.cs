using System.Collections.Generic;
using TowerD.Client.Drawers;
using TowerD.Client.Pieces.Shields;
using TowerD.Client.Pieces.Weapons;
namespace TowerD.Client.Pieces.Towers
{
    public class SingeShotTower : Tower
    {
        public SingeShotTower(Color color, int x, int y)
        {
            X = x;
            Y = y;
            Drawer = new SingeShotDrawer(color);
        }

        #region Tower Members

        public List<Weapon> Weapons { get; set; }
        public List<Shield> Shields { get; set; }
        public int X { get; set; }
        public int Y { get; set; }

        public void Tick()
        {
            Drawer.Tick();
        }

        public TowerDrawer Drawer { get; set; }

        #endregion
    }
}