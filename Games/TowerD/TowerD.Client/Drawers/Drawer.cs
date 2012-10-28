using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
namespace TowerD.Client.Drawers
{
    public interface UnitDrawer : Drawer {
        bool Destroy();
        void ResetSpeed();
        void MagnifySpeed(double rate); 
    }
    public interface WeaponDrawer : Drawer {}
    public interface ShieldDrawer : Drawer {}
    public interface TowerDrawer : Drawer {}
    public interface WaypointDrawer : Drawer
    {
          Color StartColor { get; set; }
          Color EndColor { get; set; }

        WaypointMap Map { get; set; }
    }
    public interface Drawer
    {
        void Init();
        void Tick();
        void Draw(CanvasContext2D context, int x, int y);
    }
}