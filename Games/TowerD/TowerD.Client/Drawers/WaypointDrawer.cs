namespace TowerD.Client.Drawers
{
    public interface WaypointDrawer : Drawer
    {
        Color StartColor { get; set; }
        Color EndColor { get; set; }
        WaypointMap Map { get; set; }
        void Reoganize();
    }
}