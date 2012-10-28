using System.Collections.Generic;
using TowerD.Client.Drawers;
using TowerD.Client.Pieces.Shields;
using TowerD.Client.Pieces.Weapons;
namespace TowerD.Client.Pieces.Unit
{
    public interface Unit
    { 
        List<Weapon> Weapons { get; set; } 
        List<Shield> Shields { get; set; } 
        int X { get; set; } 
        int Y { get; set; } 
        UnitDrawer Drawer { get; set; }
        void Tick();
    }
}