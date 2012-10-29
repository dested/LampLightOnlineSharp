using System.Html.Media.Graphics;
using TowerD.Client.Drawers;
namespace TowerD.Client.Pieces.Weapons
{
    public interface Weapon
    {
        int Range { get; set; }
        int OffsetX { get; set; }
        int OffsetY { get; set; }
        int Cooldown { get; set; }
        int Stength { get; set; }
        WeaponDrawer Drawer { get; set; }

        bool Tick();
        void Draw(CanvasContext2D context, int x, int y);
    }
}