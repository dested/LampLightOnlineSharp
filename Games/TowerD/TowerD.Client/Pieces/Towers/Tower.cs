using System.Collections.Generic;
using TowerD.Client.Drawers;
using TowerD.Client.Pieces.Shields;
using TowerD.Client.Pieces.Weapons;
namespace TowerD.Client.Pieces.Towers
{
    public interface Tower
    {
        List<Weapon> Weapons { get; set; }
        List<Shield> Shields { get; set; }
        int X { get; set; }
        int Y { get; set; }
        TowerDrawer Drawer { get; set; }
        void Tick();
    }
}