using System.Collections.Generic;
using CommonLibraries;
namespace TowerD.Client
{
    public class Waypoint
    {
        public WaypointMap Map { get; set; }
        public int X { get; set; }
        public int Y { get; set; }

        public Waypoint(int x, int y)
        {
            X = x;
            Y = y;
        }

        public void Reorganize()
        {
            Map.Reorganize();
        }

        public List<Point> Travel(int steps, Point scale)
        {
            return new List<Point>(Map.Travel(steps, scale, Map.Last() == this));
        }
    }
}