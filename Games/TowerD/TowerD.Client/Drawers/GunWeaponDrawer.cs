using System.Html.Media.Graphics;
using CommonLibraries;
namespace TowerD.Client.Drawers
{
    public class GunWeaponDrawer : WeaponDrawer
    {
        private ParticleSystem system;
        public GunWeaponDrawer() { }

        #region WeaponDrawer Members

        public void Init()
        {
            system = new ParticleSystem();

            system.Position = new Point(300, 190);
            system.StartColor = new int[] { 255, 0, 0, 1 };
            system.EndColor = new int[] { 127, 55, 0, 1 };
            system.Size = 20;
            system.MaxParticles = 200;
            system.LifeSpan = 40;

            system.Init();
        }

        public void Tick()
        {
            system.Update(1);
        }

        public void Draw(CanvasContext2D context, int x, int y)
        {
            system.Position.X = x;
            system.Position.Y = y;
            system.Render(context);
        }

        #endregion
    }
}