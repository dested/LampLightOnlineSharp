using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using TowerD.Client.Drawers;
namespace TowerD.Client
{
    public class WaypointMap
    {
        private Point myScale;
        [IntrinsicProperty]
        public List<Waypoint> Waypoints { get; set; }
        [IntrinsicProperty]
        public WaypointDrawer Drawer { get; set; }

        public WaypointMap(Color startColor, Color endColor, Waypoint[] points, Point scale)
        {
            myScale = scale;
            Waypoints = new List<Waypoint>();
            for (int index = 0; index < points.Length; index++) {
                Add(points[index]);
            }
            Drawer = new ColorWaypointDrawer(startColor, endColor, this, scale);
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

        public IEnumerable<Point> Travel(int stepsTotal, Point scale, bool reverse)
        {
            DoublePoint cur = new DoublePoint(0, 0);
            DoublePoint dist = new DoublePoint(0, 0);

            double stp = ( (double) stepsTotal / ( (double) Waypoints.Count - 1 ) );

            if (reverse) {
                for (int index = Waypoints.Count - 1; index >= 1; index--) {
                    var waypoint = Waypoints[index];
                    var nextWaypoint = Waypoints[index - 1];

                    cur.X = waypoint.X * scale.X;
                    cur.Y = waypoint.Y * scale.Y;

                    dist.X = ( (double) nextWaypoint.X - waypoint.X ) / stp;
                    dist.Y = ( (double) nextWaypoint.Y - waypoint.Y ) / stp;

                    for (int i = 0; i < stp; i++) {
                        cur.X += dist.X * scale.X;
                        cur.Y += dist.Y * scale.Y;
                        yield return new Point((int) cur.X, (int) cur.Y);
                    }
                }
            } else {
                for (int index = 0; index < Waypoints.Count - 1; index++) {
                    var waypoint = Waypoints[index];
                    var nextWaypoint = Waypoints[index + 1];

                    cur.X = waypoint.X * scale.X;
                    cur.Y = waypoint.Y * scale.Y;

                    dist.X = ( (double) nextWaypoint.X - waypoint.X ) / stp;
                    dist.Y = ( (double) nextWaypoint.Y - waypoint.Y ) / stp;

                    for (int i = 0; i < stp; i++) {
                        cur.X += dist.X * scale.X;
                        cur.Y += dist.Y * scale.Y;
                        yield return new Point((int) cur.X, (int) cur.Y);
                    }
                }
            }
        }

        public void Reorganize()
        {
            Drawer.Reoganize();
        }
    }
}