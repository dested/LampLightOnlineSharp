using CommonAPI;
using MMServerAPI;
using ZombieGame.Common;
using ZombieGame.Common.JSONObjects;
namespace ZombieGame.Server
{
    public class Game : LampServer
    {
        private ZombieServerGameManager gameManager;

        public Game(int region, IServerManager manager) : base(region, manager)
        {
            gameManager = new ZombieServerGameManager(this);
        }

        public override void Init()
        {
            base.Init();

            TaskHandler.Start(
                    (completed) => { gameManager.LoadTiles(fakeJsonTileMap2(), completed); }).AddTask((completed) => { gameManager.LoadTiles(fakeJsonTileMap(), completed); }).AddTask((completed) => {
                                                                                                                                                                                           GameMap bigMap = gameManager.MapManager.LoadMap(fakeJsonMap2());
                                                                                                                                                                                           gameManager.MapManager.AddMapToRegion(bigMap, 0, 0);
                                                                                                                                                                                           gameManager.MapManager.AddMapToRegion(gameManager.MapManager.LoadMap(fakeJsonMap()), bigMap.MapWidth, 0);
                                                                                                                                                                                           completed();
                                                                                                                                                                                       }).Do();

            gameManager.Init();
        }

        public override void GameTick() {}
        public override void End() {}
        public override void MakePlayerActive(LampPlayer lampPlayer) {}

        public override void ExecuteAction(LampAction action)
        {
            var zAction = (ZombieLampAction) action;

            switch (zAction.ZombieActionType) {
                case ZombieActionType.MovePlayer:
                    var zMoveAction = (MovePlayerZombieLampAction) zAction;

                    //zAction.Player
                    break;
            }
        }

        #region fakejson

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

        private static JsonTileMap fakeJsonTileMap2()
        {
            return new JsonTileMap() {
                                             MapWidth = 20,
                                             MapHeight = 16,
                                             Name = "Pretty",
                                             TileWidth = ZombieGameConfig.TileSize,
                                             TileHeight = ZombieGameConfig.TileSize,
                                             TileMapURL = "http://50.116.22.241:8881/lamp/Games/ZombieGame/assets/top.png"
                                     };
        }

        private static JsonTileMap fakeJsonTileMap()
        {
            return new JsonTileMap() {
                                             MapWidth = 12,
                                             MapHeight = 10,
                                             Name = "Pretty2",
                                             TileWidth = ZombieGameConfig.TileSize,
                                             TileHeight = ZombieGameConfig.TileSize,
                                             TileMapURL = "http://50.116.22.241:8881/lamp/Games/ZombieGame/assets/watertileset3qb2tg0.png"
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