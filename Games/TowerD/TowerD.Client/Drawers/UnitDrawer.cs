namespace TowerD.Client.Drawers
{
    public interface UnitDrawer : Drawer
    {
        bool Destroy();
        void ResetSpeed();
        void MagnifySpeed(double rate);
    }
}