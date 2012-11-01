using System;
using System.Html.Media.Graphics;
using TowerD.Client.Drawers;
using TowerD.Client.Pieces.Towers;
using TowerD.Client.Pieces.Units;
namespace TowerD.Client.Pieces.Weapons
{
    public class GunWeapon : Weapon
    {
        private int cooldownTimer = 0;
        private Tower curTarget;
        private Unit Unit { get; set; }

        public GunWeapon(Unit unit)
        {
            Unit = unit;
            Drawer = new GunWeaponDrawer();
            Drawer.Init();

            Cooldown = 20;
            Range = 6;
        }

        #region Weapon Members

        public int Range { get; set; }
        public int OffsetX { get; set; }
        public int OffsetY { get; set; }
        public int Cooldown { get; set; }
        public int Stength { get; set; }
        public WeaponDrawer Drawer { get; set; }

        public bool Tick()
        {
            var game = Game.Instance;
            Drawer.Tick();

            if (cooldownTimer++ < Cooldown) return true;
            cooldownTimer = 0;

            if (curTarget == null) {
                foreach (var kingdomkv in game.Kingdoms) {
                    Kingdom kingdom = kingdomkv.Value;
                    if (kingdom != Unit.Kingdom) {
                        foreach (var tower in kingdom.Towers) {
                            var fm = Math.Sqrt(( Math.Pow(( Unit.X / game.Scale.X ) - tower.X, 2) + Math.Pow(( Unit.Y / game.Scale.Y ) - tower.Y, 2) ));
                            if (fm < Range)
                                curTarget = tower;
                        }
                    }
                }
            }

            if (curTarget != null)
                Drawer.AddProjectile(curTarget.X, curTarget.Y);
            curTarget = null;

            return true;
        }

        public void Draw(CanvasContext2D context, int x, int y)
        {
            Drawer.Draw(context, x + OffsetX, y + OffsetY);
        }

        #endregion
    }
}