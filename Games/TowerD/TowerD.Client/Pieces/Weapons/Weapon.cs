﻿using System;
using System.Collections.Generic;
using System.Text;
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
    }
}