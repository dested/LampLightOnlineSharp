using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using TowerD.Client.Drawers;
namespace TowerD.Client
{
    public class WaypointMap
    {
        [IntrinsicProperty]
        private List<Waypoint> Waypoints { get; set; }
        [IntrinsicProperty]
        public WaypointDrawer Drawer { get; set; }

        public WaypointMap(Color startColor, Color endColor, Waypoint[] points,Point scale)
        {
            Waypoints = new List<Waypoint>();
            for (int index = 0; index < points.Length; index++) {
                Add(points[index]);
            }
            Drawer = new ColorWaypointDrawer(startColor, endColor, this,scale);
        }

        public void Add(Waypoint point)
        {
            Waypoints.Add(point);
            point.Map = this;
        }

        public Waypoint First()
        {
            return Waypoints[0];
        }

        public Waypoint Last()
        {
            return Waypoints[Waypoints.Count - 1];
        }

        public IEnumerable<DoublePoint> Travel(int stepsPer,Point scale)
        {
            DoublePoint cur = new DoublePoint(0, 0);
            DoublePoint dist = new DoublePoint(0, 0);

            for (int index = 0; index < Waypoints.Count - 1; index++) {
                var waypoint = Waypoints[index];
                var nextWaypoint = Waypoints[index + 1];

                cur.X = waypoint.X * scale.X;
                cur.Y = waypoint.Y * scale.Y;

                dist.X = ((double)nextWaypoint.X  - waypoint.X ) / stepsPer;
                dist.Y = ((double)nextWaypoint.Y  - waypoint.Y ) / stepsPer;

                for (int i = 0; i < stepsPer; i++) {
                    cur.X += dist.X * scale.X;
                    cur.Y += dist.Y * scale.Y;
                    yield return new DoublePoint(cur.X,cur.Y);
                }
            }
        }
    }
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
    }
}