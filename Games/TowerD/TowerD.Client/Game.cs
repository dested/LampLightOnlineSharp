using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using ClientAPI;
using CommonAPI;
using CommonClientLibraries.UIManager;
using CommonLibraries;
using TowerD.Client.Pieces.Towers;
using TowerD.Client.Pieces.Unit;
using jQueryApi;
namespace TowerD.Client
{
    public class Game : LampClient
    {
        public static bool DRAWFAST;
        public Point Scale = new Point(40, 30);
        private bool clicking = false;
        private Button<int> myClickState;
        private LampPlayer[] myPlayers;
        private Kingdom selectedKingdom;
        private Tower selectedTower;
        private Waypoint selectedWaypoint;
        [IntrinsicProperty]
        public JsDictionary<string, Kingdom> Kingdoms { get; set; }
        [IntrinsicProperty]
        public List<WaypointMap> WaypointMaps { get; set; }
        [IntrinsicProperty]
        public static object[] DebugText { get; set; }

        public Game()
        {
            DebugText = new object[0];
            WaypointMaps = new List<WaypointMap>();
            WaypointMaps.Add(new WaypointMap(Color.Red, Color.Green, new Waypoint[] {new Waypoint(4, 4), new Waypoint(40 - 4, 4)}, Scale));
            WaypointMaps.Add(new WaypointMap(Color.Red, Color.Yellow, new Waypoint[] {new Waypoint(4, 4), new Waypoint(20 - 4, 4), new Waypoint(20 - 4, 30 - 4), new Waypoint(40 - 4, 30 - 4)}, Scale));
            WaypointMaps.Add(new WaypointMap(Color.Red, Color.Blue, new Waypoint[] {new Waypoint(4, 4), new Waypoint(4, 30 - 4)}, Scale));
            WaypointMaps.Add(new WaypointMap(Color.Green, Color.Yellow, new Waypoint[] {new Waypoint(40 - 4, 4), new Waypoint(40 - 4, 30 - 4)}, Scale));
            WaypointMaps.Add(new WaypointMap(Color.Green, Color.Blue, new Waypoint[] {new Waypoint(40 - 4, 4), new Waypoint(4, 30 - 4)}, Scale));
            WaypointMaps.Add(new WaypointMap(Color.Yellow, Color.Blue, new Waypoint[] {new Waypoint(40 - 4, 30 - 4), new Waypoint(4, 30 - 4)}, Scale));

            Kingdoms = new JsDictionary<string, Kingdom>();
            Kingdoms["Mike"] = new Kingdom() {
                                                     Color = Color.Red,
                                                     Towers = new List<Tower>() {new KingdomTower(Color.Red, 4, 4)},
                                                     Waypoints = new List<Waypoint>() {
                                                                                              WaypointMaps[0].First(),
                                                                                              WaypointMaps[1].First(),
                                                                                              WaypointMaps[2].First(),
                                                                                      },
                                             };
            Kingdoms["Joe"] = new Kingdom() {
                                                    Color = Color.Green,
                                                    Towers = new List<Tower>() {new KingdomTower(Color.Green, 40 - 4, 4)},
                                                    Waypoints = new List<Waypoint>() {
                                                                                             WaypointMaps[0].Last(),
                                                                                             WaypointMaps[3].First(),
                                                                                             WaypointMaps[4].First(),
                                                                                     }
                                            };
            Kingdoms["Steve"] = new Kingdom() {
                                                      Color = Color.Yellow,
                                                      Towers = new List<Tower>() {
                                                                                         new KingdomTower(Color.Yellow, 40 - 4, 30 - 4),
                                                                                         new SingeShotTower(Color.Yellow, 40 - 6, 30 - 3)
                                                                                 },
                                                      Waypoints = new List<Waypoint>() {
                                                                                               WaypointMaps[1].Last(),
                                                                                               WaypointMaps[3].Last(),
                                                                                               WaypointMaps[5].First(),
                                                                                       }
                                              };
            Kingdoms["Chris"] = new Kingdom() {
                                                      Color = Color.Blue,
                                                      Towers = new List<Tower>() {new KingdomTower(Color.Blue, 4, 30 - 4)},
                                                      Waypoints = new List<Waypoint>() {
                                                                                               WaypointMaps[2].Last(),
                                                                                               WaypointMaps[4].Last(),
                                                                                               WaypointMaps[5].Last(),
                                                                                       }
                                              };
/*
            KeyboardJS.Instance().Bind.Key("space",
                                           () => {
                                           },
                                           () => { });
*/
        }

        public override void Init(LampPlayer[] players, CanvasContext2D context)
        {
            myPlayers = players;

            context.CompositeOperation = CompositeOperation.Lighter;

            foreach (var kingdom in Kingdoms) {
                foreach (var tower in kingdom.Value.Towers) {
                    tower.Drawer.Init();
                }
                foreach (var unit in kingdom.Value.Units) {
                    unit.Drawer.Init();
                }
            }
            foreach (var waypointMap in WaypointMaps) {
                waypointMap.Drawer.Init();
            }
        }

        public override void Tick()
        {
            foreach (var kingdom in Kingdoms) {
                foreach (var tower in kingdom.Value.Towers) {
                    tower.Tick();
                }

                for (int index = kingdom.Value.Units.Count - 1; index >= 0; index--) {
                    var unit = kingdom.Value.Units[index];
                    if (!unit.Tick()) kingdom.Value.Units.Remove(unit);
                }
            }
            foreach (var waypointMap in WaypointMaps) {
                waypointMap.Drawer.Tick();
            }
        }

        public override void BuildUI(UIManager manager)
        {
            UIArea manageData;
            manager.AddArea(manageData = new UIArea(WindowLocation.Width - 400, 100, 250, 300) {Closable = true});
            manageData.Visible = true;
            manageData.AddControl(new TextArea(30, 25, "Manage Defense") {Color = "blue"});

            myClickState = null;
            myClickState = new Button<int>(0,
                                           20,
                                           50,
                                           100,
                                           25,
                                           (Func<string>) ( () => {
                                                                switch (myClickState.Data) {
                                                                    case 0:
                                                                        return "Move Kingdom";
                                                                    case 1:
                                                                        return "Move Waypoint";
                                                                    case 2:
                                                                        return "Add Waypoint";
                                                                    case 3:
                                                                        return "Place Tower";
                                                                }
                                                                return "";
                                                            } )) {
                                                                         Click = (p) => {
                                                                                     myClickState.Data++;
                                                                                     myClickState.Data = myClickState.Data % 4;
                                                                                 }
                                                                 };
            manageData.AddControl(myClickState);
            manageData.AddControl(new Button(20, 80, 100, 25, "Send Wave") {
                                                                                   Click = (p) => {
                                                                                               foreach (var kingdom in Kingdoms) {
                                                                                                   kingdom.Value.Units.AddRange(new List<Unit>() {
                                                                                                                                                         new QuickShooterUnit(kingdom.Value.Waypoints[0].Travel(150, Scale), kingdom.Value.Color),
                                                                                                                                                         new QuickShooterUnit(kingdom.Value.Waypoints[1].Travel(150, Scale), kingdom.Value.Color),
                                                                                                                                                         new QuickShooterUnit(kingdom.Value.Waypoints[2].Travel(150, Scale), kingdom.Value.Color)
                                                                                                                                                 });
                                                                                               }
                                                                                           }
                                                                           });

            manageData.AddControl(new Button(20, 125, 100, 25, ( (Func<string>) ( () => { return DRAWFAST ? "Draw Slow" : "Draw Fast"; } ) )) {Click = (p) => { DRAWFAST = !DRAWFAST; }});
        }

        public override bool MouseMove(jQueryEvent jQueryEvent)
        {
            if (!clicking) return false;
            Point point = new Point(jQueryEvent.ClientX / Scale.X, jQueryEvent.ClientY / Scale.Y);

            switch (myClickState.Data) {
                case 0:
                    if (selectedTower != null) {
                        if (TowerExistsAt(point.X, point.Y) == null) {
                            selectedTower.X = point.X;
                            selectedTower.Y = point.Y;
                            if (selectedKingdom.KingdomTower == selectedTower) {
                                selectedKingdom.Waypoints[0].X = point.X;
                                selectedKingdom.Waypoints[0].Y = point.Y;
                                selectedKingdom.Waypoints[0].Reorganize();

                                selectedKingdom.Waypoints[1].X = point.X;
                                selectedKingdom.Waypoints[1].Y = point.Y;
                                selectedKingdom.Waypoints[1].Reorganize();

                                selectedKingdom.Waypoints[2].X = point.X;
                                selectedKingdom.Waypoints[2].Y = point.Y;
                                selectedKingdom.Waypoints[2].Reorganize();
                            }
                        }
                    }
                    return true;
                case 1:
                    if (selectedWaypoint != null) {
                        selectedWaypoint.X = point.X;
                        selectedWaypoint.Y = point.Y;
                        selectedWaypoint.Reorganize();
                    }
                    return true;
                case 2:
                    break;
                case 3:
                    break;
            }
            return false;
        }

        public override bool OnClick(jQueryEvent jQueryEvent)
        {
            clicking = true;
            selectedWaypoint = null;
            selectedTower = null;

            Point point = new Point(jQueryEvent.ClientX / Scale.X, jQueryEvent.ClientY / Scale.Y);
            switch (myClickState.Data) {
                case 0:
                    selectedKingdom = null;

                    foreach (var kingdom in Kingdoms) {
                        foreach (var tower1 in kingdom.Value.Towers) {
                            if (tower1.X == point.X && tower1.Y == point.Y) {
                                selectedKingdom = kingdom.Value;
                                selectedTower = tower1;
                                break;
                            }
                        }
                    }
                    break;
                case 1:
                    foreach (var waypointMap in WaypointMaps) {
                        foreach (var p in waypointMap.Waypoints) {
                            if (p.X == point.X && p.Y == point.Y) {
                                selectedWaypoint = p;
                                break;
                            }
                        }
                    }
                    break;
                case 2:
                    break;
                case 3:

                    if (selectedKingdom != null) {
                        if (TowerExistsAt(point.X, point.Y) == null) {
                            Tower tower = new SingeShotTower(selectedKingdom.Color, point.X, point.Y);
                            selectedKingdom.Towers.Add(selectedTower = tower);
                            tower.Drawer.Init();
                        }
                    }
                    break;
            }

            return base.OnClick(jQueryEvent);
        }

        private Tower TowerExistsAt(int x, int y)
        {
            foreach (var kingdom in Kingdoms) {
                foreach (var tower in kingdom.Value.Towers) {
                    if (tower.X == x && tower.Y == y)
                        return tower;
                }
            }
            return null;
        }

        public override bool MouseUp(jQueryEvent jQueryEvent)
        {
            clicking = false;

            return base.MouseUp(jQueryEvent);
        }

        public override void Draw(CanvasContext2D context)
        {
            foreach (var kingdom in Kingdoms) {
                foreach (var tower in kingdom.Value.Towers) {
                    tower.Drawer.Draw(context, tower.X * Scale.X, tower.Y * Scale.Y);
                }
                foreach (var unit in kingdom.Value.Units) {
                    unit.Draw(context, unit.X * Scale.X, unit.Y * Scale.Y);
                }
            }
            foreach (var waypointMap in WaypointMaps) {
                waypointMap.Drawer.Draw(context, 0, 0);
            }

            for (int i = 0; i < DebugText.Length; i++) {
                if (DebugText[i].Truthy()) {
                    context.Save();
                    context.StrokeStyle = "white";
                    context.StrokeText(DebugText[i].ToString(), WindowLocation.Width - 120, i * 20 + 150);
                    context.Restore();
                }
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