using System.Html.Media.Graphics;
namespace TowerD.Client.Drawers
{
    public interface UnitDrawer : Drawer { }
    public interface WeaponDrawer : Drawer { }
    public interface ShieldDrawer : Drawer { }
    public interface TowerDrawer : Drawer { }
    public interface WaypointDrawer : Drawer
    {
        WaypointMap Map { get; set; }
    }
    public interface Drawer
    {
        void Init();
        void Tick();
        void Draw(CanvasContext2D context, int x, int y);
    }
}