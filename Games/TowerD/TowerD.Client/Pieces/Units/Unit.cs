using System.Collections.Generic;
using System.Html.Media.Graphics;
using TowerD.Client.Drawers;
using TowerD.Client.Pieces.Shields;
using TowerD.Client.Pieces.Weapons;
namespace TowerD.Client.Pieces.Units
{
    public interface Unit
    {
        List<Weapon> Weapons { get; set; }
        List<Shield> Shields { get; set; }
        int X { get; set; }
        int Y { get; set; }
        UnitDrawer Drawer { get; set; }
        Kingdom Kingdom { get; set; }
        bool Tick();
        void Draw(CanvasContext2D context, int x, int y);
    }
}