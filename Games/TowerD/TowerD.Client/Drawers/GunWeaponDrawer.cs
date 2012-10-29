using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using CommonLibraries;
namespace TowerD.Client.Drawers
{
    public class GunWeaponDrawer : WeaponDrawer
    {
        private ParticleSystem system;

        private List<ParticleSystem> projectiles = new List<ParticleSystem>();

        public GunWeaponDrawer() {}

        #region WeaponDrawer Members

        public void Init()
        {
            system = new ParticleSystem(5);

            system.Position = new Point(300, 190);
            system.StartColor = new int[] {255, 0, 0, 1};
            system.EndColor = new int[] {127, 55, 0, 1};
            system.Size = 20;
            system.MaxParticles = 25;
            system.LifeSpan = 25;

            system.Init();
        }

        public void Tick()
        {
            system.Update(1);
            foreach (var particleSystem in projectiles)
            {
                particleSystem.Update(1);

            }
        }

        public void Draw(CanvasContext2D context, int x, int y)
        {
            system.Position.X = x;
            system.Position.Y = y;
       //     system.Render(context);

            foreach (var particleSystem in projectiles)
            {
                particleSystem.Render(context);
            }

        }

        public void AddProjectile(int x, int y)
        {






           var  proj = new ParticleSystem(6);

           proj.Position = system.Position.Clone();
            proj.StartColor = new int[] { 127, 0, 0, 1 };
            proj.EndColor = new int[] { 127, 55, 0, 1 }; 
            proj.Size = 15;
            proj.MaxParticles = 25;
            proj.LifeSpan = 25;
            double angle = Math.Atan2(-y - proj.Position.Y, -x - proj.Position.X) / Math.PI * 180 + 180;

            proj.Angle = (int)(angle);
            proj.AngleRandom = 10;
            proj.MaxEmitted = 10;
            proj.Speed = 10;
            proj.Gravity =new DoublePoint(0,0);
            proj.Init();

            projectiles.Add(proj);

        }

        #endregion
    }
}