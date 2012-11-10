using System.Collections.Generic;
using System.Runtime.CompilerServices;
using TowerD.Client.Pieces.Towers;
using TowerD.Client.Pieces.Units;
namespace TowerD.Client
{
    public class Kingdom
    {
        [IntrinsicProperty]
        public List<Tower> Towers { get; set; }
        [IntrinsicProperty]
        public List<Unit> Units { get; set; }
        [IntrinsicProperty]
        public List<Waypoint> Waypoints { get; set; }
        [IntrinsicProperty]
        public Color Color { get; set; }
        public Tower KingdomTower
        {
            get { return Towers[0]; }
        }

        public Kingdom()
        {
            Towers = new List<Tower>();
            Units = new List<Unit>();
        }
    }
}