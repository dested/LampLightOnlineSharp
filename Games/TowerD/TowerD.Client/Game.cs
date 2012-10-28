using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using ClientAPI;
using CommonAPI;
using CommonLibraries;
using TowerD.Client.Drawers;
using TowerD.Client.Pieces.Towers;
using TowerD.Client.Pieces.Unit;
using jQueryApi;
namespace TowerD.Client
{
    public class Game : LampClient
    {
        public Point Scale = new Point(40, 30);
        private LampPlayer[] myPlayers;
        [IntrinsicProperty]
        public JsDictionary<string, Kingdom> Kingdoms { get; set; }
        [IntrinsicProperty]
        public List<WaypointMap> WaypointMaps { get; set; }

        public Game()
        {
            WaypointMaps = new List<WaypointMap>();
            WaypointMaps.Add(new WaypointMap(Color.Red, Color.Green, new Waypoint[] {new Waypoint(4, 4), new Waypoint(40 - 4, 4)},Scale));
            WaypointMaps.Add(new WaypointMap(Color.Red, Color.Yellow, new Waypoint[] { new Waypoint(4, 4), new Waypoint(40 - 4, 30 - 4) }, Scale));
            WaypointMaps.Add(new WaypointMap(Color.Red, Color.Blue, new Waypoint[] { new Waypoint(4, 4), new Waypoint(4, 30 - 4) }, Scale));
            WaypointMaps.Add(new WaypointMap(Color.Green, Color.Yellow, new Waypoint[] { new Waypoint(40 - 4, 4), new Waypoint(40 - 4, 30 - 4) }, Scale));
            WaypointMaps.Add(new WaypointMap(Color.Green, Color.Blue, new Waypoint[] { new Waypoint(40 - 4, 4), new Waypoint(4, 30 - 4) }, Scale));
            WaypointMaps.Add(new WaypointMap(Color.Yellow, Color.Blue, new Waypoint[] { new Waypoint(40 - 4, 30 - 4), new Waypoint(4, 30 - 4) }, Scale));

            Kingdoms = new JsDictionary<string, Kingdom>();
            Kingdoms["Mike"] = new Kingdom() {
                                                     Towers = new List<Tower>() {new KingdomTower(Color.Red, 4, 4)},
                                                     Waypoints = new List<Waypoint>() {
                                                                                              WaypointMaps[0].First(),
                                                                                              WaypointMaps[1].First(),
                                                                                              WaypointMaps[2].First(),
                                                                                      }
                                             };
            Kingdoms["Joe"] = new Kingdom() {
                                                    Towers = new List<Tower>() {new KingdomTower(Color.Green, 40 - 4, 4)},
                                                    Waypoints = new List<Waypoint>() {
                                                                                             WaypointMaps[0].Last(),
                                                                                             WaypointMaps[3].First(),
                                                                                             WaypointMaps[4].First(),
                                                                                     }
                                            };
            Kingdoms["Steve"] = new Kingdom() {
                Towers = new List<Tower>() { new KingdomTower(Color.Yellow, 40 - 4, 30 - 4) ,
                
                    new SingeShotTower(Color.Yellow, 40 - 6, 30 - 3)
                },
                                                      Waypoints = new List<Waypoint>() {
                                                                                               WaypointMaps[1].Last(),
                                                                                               WaypointMaps[3].Last(),
                                                                                               WaypointMaps[5].First(),
                                                                                       }
                                              };
            Kingdoms["Chris"] = new Kingdom() {
                                                      Towers = new List<Tower>() {new KingdomTower(Color.Blue, 4, 30 - 4)},
                                                      Waypoints = new List<Waypoint>() {
                                                                                               WaypointMaps[2].Last(),
                                                                                               WaypointMaps[4].Last(),
                                                                                               WaypointMaps[5].Last(),
                                                                                       }
                                              };
        }

        public override void Init(LampPlayer[] players, CanvasContext2D context)
        {
            myPlayers = players;

            context.CompositeOperation = CompositeOperation.Lighter;

            foreach (var kingdom in Kingdoms) {
                foreach (var tower in kingdom.Value.Towers) {
                    tower.Drawer.Init();
                }
            }
            foreach (var waypointMap in WaypointMaps) {
                waypointMap.Drawer.Init();
            }
        }

        public override void Tick()
        {
            foreach (var kingdom in Kingdoms) {
                foreach (var tower in kingdom.Value.Towers)
                {
                    tower.Tick();
                }

                foreach (var tower in kingdom.Value.Towers)
                {
                    tower.Tick();
                }
            }
            foreach (var waypointMap in WaypointMaps) {
                waypointMap.Drawer.Tick();
            }
        }

        public override bool MouseMove(jQueryEvent jQueryEvent)
        {
            return false;
        }

        public override bool OnClick(jQueryEvent jQueryEvent)
        {
            return base.OnClick(jQueryEvent);
        }

        public override bool MouseUp(jQueryEvent jQueryEvent)
        {
            return base.MouseUp(jQueryEvent);
        }

        public override void Draw(CanvasContext2D context)
        {
            foreach (var kingdom in Kingdoms) {
                foreach (var tower in kingdom.Value.Towers) {
                    tower.Drawer.Draw(context, tower.X * Scale.X, tower.Y * Scale.Y);
                }
            }
            foreach (var waypointMap in WaypointMaps) {
                waypointMap.Drawer.Draw(context, 0, 0);
            }
        }
    }
    public class Kingdom
    {
        [IntrinsicProperty]
        public List<Tower> Towers { get; set; }
        [IntrinsicProperty]
        public List<Unit> Units { get; set; }
        [IntrinsicProperty]
        public List<Waypoint> Waypoints { get; set; }

        public Kingdom()
        {
            Towers = new List<Tower>();
            Units = new List<Unit>();
        }
    }
}