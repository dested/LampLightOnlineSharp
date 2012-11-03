using System;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using ClientAPI;
using CommonAPI;
using CommonClientLibraries.UIManager;
using CommonLibraries;
using WebLibraries;
using ZombieGame.Common.JSONObjects;
namespace ZombieGame.Client
{
    public class Game : LampClient
    {
        public const int TILESIZE = 32;
        private bool clicking = false;
        private GameManager gameManager;
        private Button<bool> myClickState;
        private LampPlayer[] myPlayers;
        [IntrinsicProperty]
        public static object[] DebugText { get; set; }

        public Game()
        {
            gameManager = new GameManager(this);

            DebugText = new object[0];
        }

        public override void Resize() {}

        public override void BindKeys(KeyboardJS manager)
        {
            manager.Bind.Key("ctrl",
                             () => {
                                 /*keydown*/
                                 gameManager.ClickMode = ClickMode.DragMap;
                             },
                             () => {
                                 /*keyup*/
                                 gameManager.ClickMode = ClickMode.MoveCharacter;
                             });

            manager.Bind.Key("shift",
                             () => {
                                 /*keydown*/
                             },
                             () => {
                                 /*keyup*/
                             });
        }

        public override void Init(LampPlayer[] players, CanvasContext2D context)
        {
            myPlayers = players;
            gameManager.GameMode = GameMode.Play;

            TaskHandler.Start(
                    (completed) => { gameManager.LoadTiles(fakeJsonTileMap2(), completed); }).AddTask((completed) => { gameManager.LoadTiles(fakeJsonTileMap(), completed); }).AddTask((completed) => {
                                                                                                                                                                                           GameMap bigMap = gameManager.MapManager.LoadMap(fakeJsonMap2());
                                                                                                                                                                                           gameManager.MapManager.AddMapToRegion(bigMap, 0, 0);
                                                                                                                                                                                           gameManager.MapManager.AddMapToRegion(gameManager.MapManager.LoadMap(fakeJsonMap()), bigMap.MapWidth, 0);
                                                                                                                                                                                           completed();
                                                                                                                                                                                       }).Do();

            gameManager.Init();
        }

        private static string[][] makeFakeMap(string name, int w, int h)
        {
            string[][] keys = new string[w][];
            for (int x = 0; x < w; x++) {
                keys[x] = new string[h];
                for (int y = 0; y < h; y++) {
                    keys[x][y] = Tile.MakeKey(name, x, y);
                }
            }

            return keys;
        }

        public override void Tick()
        {
            gameManager.Tick();
        }

        public override void BuildUI(UIManager manager)
        {
            UIArea manageData;
            manager.AddArea(manageData = new UIArea(Screen.Width - 400, 100, 250, 300) {Closable = true});
            manageData.Visible = true;
            manageData.AddControl(new TextArea(30, 25, "Manage Defense") {Color = "blue"});

            manageData.AddControl(new TextArea(5, 50, "Mode: "));

            myClickState = null;
            myClickState = new Button<bool>(true, 20, 50, 100, 25, new Func<string>(() => { return myClickState.Data ? "Edit" : "Play"; })) {
                                                                                                                                                    Click = (p) => {
                                                                                                                                                                myClickState.Data = !myClickState.Data;

                                                                                                                                                                if (myClickState.Data) gameManager.GameMode = GameMode.Play;
                                                                                                                                                                else gameManager.GameMode = GameMode.TileEdit;
                                                                                                                                                            }
                                                                                                                                            };

            manageData.AddControl(myClickState);
            manageData.AddControl(new Button(20, 80, 100, 25, "Send Wave") {Click = (p) => { }});
        }

        public override bool MouseMove(Pointer pointer)
        {
            if (!clicking) return false;
            if (gameManager.ClickMode == ClickMode.DragMap)
                gameManager.WindowManager.CenterAround(pointer.X, pointer.Y);
            return false;
        }

        public override bool OnClick(Pointer pointer)
        {
            clicking = true;

            if (gameManager.ClickMode == ClickMode.MoveCharacter) {
                pointer = offsetPointer(pointer);
                gameManager.UnitManager.MainCharacter.MoveTowards(pointer.X, pointer.Y);
            }
            return false;
        }

        private Pointer offsetPointer(Pointer pointer)
        {
            pointer = gameManager.OffsetPointer(pointer); //the screen offset
            pointer.X /= gameManager.Scale.X;
            pointer.Y /= gameManager.Scale.Y; //the scale "offset"
            pointer = gameManager.WindowManager.OffsetPointer(pointer); //the window offset
            return pointer;
        }

        public override bool MouseUp(Pointer pointer)
        {
            clicking = false;

            return base.MouseUp(pointer);
        }

        public override void Draw(CanvasContext2D context)
        {
            context.FillStyle = "black";
            context.FillRect(100, 100, 200, 200);

            gameManager.Draw(context);

            for (int i = 0; i < DebugText.Length; i++) {
                if (DebugText[i].Truthy()) {
                    context.Save();
                    context.StrokeStyle = "white";
                    context.StrokeText(DebugText[i].ToString(), Screen.Width - 120, i * 20 + 150);
                    context.Restore();
                }
            }
        }

        #region fakejson

        private static JsonTileMap fakeJsonTileMap2()
        {
            return new JsonTileMap() {
                                             Name = "Pretty",
                                             TileWidth = TILESIZE,
                                             TileHeight = TILESIZE,
                                             TileMapFile = "http://dested.com/lamp/Games/ZombieGame/assets/top.png"
                                     };
        }

        private static JsonTileMap fakeJsonTileMap()
        {
            return new JsonTileMap() {
                                             Name = "Pretty2",
                                             TileWidth = TILESIZE,
                                             TileHeight = TILESIZE,
                                             TileMapFile = "http://dested.com/lamp/Games/ZombieGame/assets/watertileset3qb2tg0.png"
                                     };
        }

        private static JsonMap fakeJsonMap2()
        {
            return new JsonMap() {
                                         MapWidth = 20,
                                         MapHeight = 16,
                                         Name = "Pretties",
                                         TileMap = makeFakeMap("Pretty", 20, 16)
                                 };
        }

        private static JsonMap fakeJsonMap()
        {
            return new JsonMap() {
                                         MapWidth = 12,
                                         MapHeight = 10,
                                         Name = "Pretties2",
                                         TileMap = makeFakeMap("Pretty2", 12, 10)
                                 };
        }

        #endregion
    }
}