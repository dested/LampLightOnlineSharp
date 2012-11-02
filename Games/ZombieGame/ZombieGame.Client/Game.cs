using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using ClientAPI;
using CommonAPI;
using CommonClientLibraries.UIManager;
using CommonLibraries;
using WebLibraries;
using ZombieGame.Common.JSONObjects;
using jQueryApi;
namespace ZombieGame.Client
{
    public delegate void Completed();
    public class Game : LampClient
    {

        public static Game Instance;
        private GameManager gameManager;
        private bool clicking = false;
        private Button<bool> myClickState;
        private LampPlayer[] myPlayers;
        public const int TILESIZE=32;
        [IntrinsicProperty]
        public static object[] DebugText { get; set; }

        public Game()
        {
            Instance = this;
            gameManager = new GameManager();

            DebugText = new object[0];

        }

        public override void BindKeys(KeyboardJS manager)
        {
            manager.Bind.Key("space",() => { /*keydown*/},() => { /*keyup*/});
        }

        public class TaskHandler
        {
            public static TaskHandler Start(Action<Completed> task)
            {
                return new TaskHandler().AddTask(task);
            }
            public TaskHandler()
            {
                Tasks = new List<Action<Completed>>();
            }

            public List<Action<Completed>> Tasks { get; set; }
            public TaskHandler AddTask(Action<Completed> task)
            {
                Tasks.Add(task);
                return this;
            }

            private int current = 0;
            public void Do()
            {

                Tasks[current++](happen);
            }
            public void happen()
            {
                if (current == Tasks.Count)
                    return;
                Tasks[current++](happen);

            }
        }

        public override void Init(LampPlayer[] players, CanvasContext2D context)
        {

            myPlayers = players;

            TaskHandler.Start((completed) => {
                                  gameManager.LoadTiles(new JsonTileMap() {
                                                                                  Name = "Pretty",
                                                                                  TileWidth = 32,
                                                                                  TileHeight = 32,
                                                                                  TileMapFile = "http://dested.com/lamp/Games/ZombieGame/assets/LostGarden+WoodTiles.png"
                                                                          },
                                                        completed);
                              }).AddTask((completed) => {

                                             gameManager.LoadTiles(new JsonTileMap() {
                                                                                             Name = "Pretty2",
                                                                                             TileWidth = 32,
                                                                                             TileHeight = 32,
                                                                                             TileMapFile = "http://dested.com/lamp/Games/ZombieGame/assets/watertileset3qb2tg0.png"
                                                                                     },
                                                                   completed);

                                         }).AddTask((completed) => {
                                                        GameMap bigMap = gameManager.MapManager.LoadMap(new JsonMap() {
                                                                                                                              MapWidth = 19,
                                                                                                                              MapHeight = 21,
                                                                                                                              Name = "Pretties",
                                                                                                                              TileMap = makeFakeMap("Pretty", 19, 21)
                                                                                                                      });
                                                        gameManager.MapManager.AddMapToRegion(bigMap, 0, 0);
                                                        gameManager.MapManager.AddMapToRegion(gameManager.MapManager.LoadMap(new JsonMap() {
                                                                                                                                                   MapWidth = 12,
                                                                                                                                                   MapHeight = 10,
                                                                                                                                                   Name = "Pretties2",
                                                                                                                                                   TileMap = makeFakeMap("Pretty2", 12, 10)
                                                                                                                                           }),
                                                                                              bigMap.MapWidth,
                                                                                              0);
                                                        completed();
                                                    }).Do();
        }

        private static string[][] makeFakeMap(string name,int w, int h)
        {
            string[][] keys=new string[w][];
            for (int x = 0; x < w; x++) {
                keys[x]=new string[h];
                for (int y = 0; y < h; y++) {
                    keys[x][y] = Tile.MakeKey(name, x, y);
                }
            }

            return keys;
        }

        public override void Tick() {}

        public override void BuildUI(UIManager manager)
        {
            UIArea manageData;
            manager.AddArea(manageData = new UIArea(WindowLocation.Width - 400, 100, 250, 300) {Closable = true});
            manageData.Visible = true;
            manageData.AddControl(new TextArea(30, 25, "Manage Defense") {Color = "blue"});

            myClickState = null;
            myClickState = new Button<bool>(false, 20, 50, 100, 25, new Func<string>(() => { return myClickState.Data ? "This" : "That"; })) {Click = (p) => { myClickState.Data = !myClickState.Data; }};

            manageData.AddControl(myClickState);
            manageData.AddControl(new Button(20, 80, 100, 25, "Send Wave") {Click = (p) => { }}); 
        }

        public override bool MouseMove(jQueryEvent jQueryEvent)
        {
            if (!clicking) return false;
            return false;
        }

        public override bool OnClick(jQueryEvent jQueryEvent)
        {
            clicking = true;
            return false;
        }

        public override bool MouseUp(jQueryEvent jQueryEvent)
        {
            clicking = false;

            return base.MouseUp(jQueryEvent);
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
                    context.StrokeText(DebugText[i].ToString(), WindowLocation.Width - 120, i * 20 + 150);
                    context.Restore();
                }
            }
        }
    }
}