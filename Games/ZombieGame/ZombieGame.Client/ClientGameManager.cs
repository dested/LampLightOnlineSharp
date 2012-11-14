using System;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonAPI;
using CommonClientLibraries.UIManager;
using CommonLibraries;
using ZombieGame.Common;
using ZombieGame.Common.JSONObjects;
namespace ZombieGame.Client
{
    public class ClientGameManager : GameManager
    {
        protected internal readonly Game myGame;
        private Point screenOffset;
        public WindowManager WindowManager { get; set; }
        [IntrinsicProperty]
        public GameMode GameMode { get; set; }
        [IntrinsicProperty]
        public ClickMode ClickMode { get; set; }
        [IntrinsicProperty]
        public Point Scale { get; set; }
        [IntrinsicProperty]
        public ActionManager ActionManager { get; set; }

        public ClientGameManager(Game game)
        {
            TileManager = new DrawTileManager(this);
            MapManager = new DrawMapManager(this, 400, 400);
            UnitManager = new DrawUnitManager(this);

            myGame = game;
            WindowManager = new WindowManager(this, 0, 0, 400, 225);
            ActionManager = new ActionManager(this);
            screenOffset = new Point(0, 0);
            Scale = new Point(2, 2);
            ClickMode = ClickMode.MoveCharacter;

            UnitManager.MainCharacterUpdate += (x, y) => { WindowManager.CenterAround(x, y); };
        }

        public override void Init()
        {
            ActionManager.Init();
            base.Init();
        }

        public override void Tick()
        {
            ActionManager.Tick();
            base.Tick();
        }

        public void LoadTiles(JsonTileMap jsonTileMap, Completed completed)
        {
            CHelp.LoadImageFromUrl(jsonTileMap.TileMapURL,
                                   (image) => { ( (DrawTileManager) TileManager ).LoadTiles(jsonTileMap, image, completed); });
        }

        public void Draw(CanvasContext2D context)
        {
            context.Save();
            switch (GameMode) {
                case GameMode.TileEdit:

                    break;
                case GameMode.Play:
                    screenOffset.X = myGame.Screen.Width / 2 - WindowManager.Width * Scale.X / 2;
                    screenOffset.Y = myGame.Screen.Height / 2 - WindowManager.Height * Scale.Y / 2;
                    context.Translate(screenOffset.X, screenOffset.Y);

                    playDraw(context);

                    break;
            }

            context.Restore();
        }

        private void playDraw(CanvasContext2D context)
        {
            var wm = WindowManager;
            int wX = Math.Max(0, wm.X / ZombieGameConfig.TileSize - 3);
            int wY = Math.Max(0, wm.Y / ZombieGameConfig.TileSize - 3);

            int wWidth = wX + wm.Width / ZombieGameConfig.TileSize + 6;
            int wHeight = wY + wm.Height / ZombieGameConfig.TileSize + 6;

            context.Save();

            context.Scale(Scale.X, Scale.Y);

            context.BeginPath();
            context.Rect(0, 0, wm.Width, wm.Height);
            context.Clip();
            context.ClosePath();

            context.Translate(-wm.X, -wm.Y);

            ( (DrawMapManager) MapManager ).Draw(context, wX, wY, wWidth, wHeight);
            ( (DrawUnitManager) UnitManager ).Draw(context);

            context.Restore();
        }

        public void OffsetPointer(Pointer pointer)
        {
            pointer.X -= screenOffset.X;
            pointer.Y -= screenOffset.Y;
        }

        public void GameTick()
        {
            ActionManager.Tick();
        }
    }
}