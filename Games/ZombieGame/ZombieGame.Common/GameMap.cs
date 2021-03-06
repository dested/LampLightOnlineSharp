using System.Runtime.CompilerServices;
using ZombieGame.Common.JSONObjects;
namespace ZombieGame.Common
{
    public class GameMap
    {
        private readonly MapManager myMapManager;
        [IntrinsicProperty]
        public int MapWidth { get; set; }
        [IntrinsicProperty]
        public int MapHeight { get; set; }
        [IntrinsicProperty]
        public string Name { get; set; }
        [IntrinsicProperty]
        public Tile[][] TileMap { get; set; }
        [IntrinsicProperty]
        public CollisionType[][] CollisionMap { get; set; }

        public GameMap(MapManager mapManager, JsonMap jsonMap)
        {
            myMapManager = mapManager;
            Name = jsonMap.Name;
            MapWidth = jsonMap.MapWidth;
            MapHeight = jsonMap.MapHeight;
            TileMap = new Tile[MapWidth][];
            CollisionMap = new CollisionType[MapWidth][];
            for (int x = 0; x < MapWidth; x++) {
                TileMap[x] = new Tile[MapHeight];
                CollisionMap[x] = new CollisionType[MapHeight];
                for (int y = 0; y < MapHeight; y++) {
                    string key = jsonMap.TileMap[x][y];
                    var tile = myMapManager.myGameManager.TileManager.GetTileByKey(key);
                    TileMap[x][y] = tile;
                    CollisionMap[x][y] = tile.Collision;
                }
            }
        }

        public Tile GetTileAt(int x, int y)
        {
            return TileMap[x][y];
        }
    }
}