﻿using System;
using System.Collections.Generic;
using System.Text;
using TowerD.Client.Drawers;
namespace TowerD.Client.Pieces.Shields
{
    public interface Shield
    {
        ShieldDrawer Drawer { get; set; }
        int Strength { get; set; }
    }
}