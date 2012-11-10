using System.Collections.Generic;
using ZombieGame.Common.JSONObjects;
namespace ZombieGame.Common
{
    public class MapManager
    {
        protected internal readonly GameManager myGameManager;
        protected readonly int myTotalRegionHeight;
        protected readonly int myTotalRegionWidth;
        public JsDictionary<string, GameMap> GameMaps { get; set; }
        public CollisionType[][] CollisionMap { get; private set; }
        public List<GameMapLayout> GameMapLayouts { get; set; }

        public MapManager(GameManager gameManager, int totalRegionWidth, int totalRegionHeight)
        {
            myGameManager = gameManager;
            myTotalRegionWidth = totalRegionWidth;
            myTotalRegionHeight = totalRegionHeight;
            GameMaps = new JsDictionary<string, GameMap>();
            GameMapLayouts = new List<GameMapLayout>();

            CollisionMap = new CollisionType[myTotalRegionWidth][];
            for (int x = 0; x < myTotalRegionWidth; x++) {
                CollisionMap[x] = new CollisionType[myTotalRegionHeight];
                for (int y = 0; y < myTotalRegionHeight; y++) {
                    CollisionMap[x][y] = 0;
                }
            }
        }

        public virtual GameMap LoadMap(JsonMap jsonMap)
        {
            GameMap gameMap = new GameMap(this, jsonMap);
            GameMaps[gameMap.Name] = gameMap;
            return gameMap;
        }

        public void AddMapToRegion(string name, int x, int y)
        {
            AddMapToRegion(GameMaps[name], x, y);
        }

        public void AddMapToRegion(GameMap gameMap, int x, int y)
        {
            GameMapLayouts.Add(new GameMapLayout() {GameMap = gameMap, X = x, Y = y});

            for (int _x = 0; _x < gameMap.MapWidth; _x++) {
                for (int _y = 0; _y < gameMap.MapHeight; _y++) {
                    CollisionMap[_x + x][_y + y] = gameMap.CollisionMap[_x][_y];
                }
            }
        }
    }
}