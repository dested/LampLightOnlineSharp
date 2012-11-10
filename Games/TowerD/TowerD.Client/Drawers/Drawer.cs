using System.Html.Media.Graphics;
namespace TowerD.Client.Drawers
{
    public interface Drawer
    {
        void Init();
        void Tick();
        void Draw(CanvasContext2D context, int x, int y);
    }
}