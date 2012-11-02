using System.Collections.Generic;
using System.Html.Media.Graphics;
using ZombieGame.Common.JSONObjects;
namespace ZombieGame.Client
{
    public class MapManager
    {
        internal readonly GameManager myGameManager;
        private readonly int myTotalRegionWidth;
        private readonly int myTotalRegionHeight;
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
            for (int x = 0; x < myTotalRegionWidth; x++)
            {
                CollisionMap[x] = new CollisionType[myTotalRegionHeight];
                for (int y = 0; y < myTotalRegionHeight; y++)
                {
                    CollisionMap[x][y] = 0;
                }
            }

        }

        public GameMap LoadMap(JsonMap jsonMap)
        {
            GameMap gameMap = new GameMap(this, jsonMap);
            GameMaps[gameMap.Name] = gameMap;
            return gameMap;
        }
        public void AddMapToRegion(string name,int x, int y)
        {
            AddMapToRegion(GameMaps[name],x,y);
        }

        public void AddMapToRegion(GameMap gameMap, int x, int y)
        {
            GameMapLayouts.Add(new GameMapLayout() {GameMap = gameMap, X = x, Y = y});

            for (int _x = 0; _x < gameMap.MapWidth; _x++)
            {
                for (int _y = 0; _y < gameMap.MapHeight; _y++)
                {
                    CollisionMap[_x+x][_y+y] = gameMap.CollisionMap[_x][_y];
                }
            }

        }

        public void Draw(CanvasContext2D context)
        {

            foreach (var gameMapLayout in GameMapLayouts) {
                gameMapLayout.GameMap.Draw(context, gameMapLayout.X * Game.TILESIZE, gameMapLayout.Y * Game.TILESIZE);
            } 


        }

    }
    public class GameMapLayout
    {
        public GameMap GameMap { get; set; }
        public int X { get; set; }
        public int Y { get; set; }

    }

}