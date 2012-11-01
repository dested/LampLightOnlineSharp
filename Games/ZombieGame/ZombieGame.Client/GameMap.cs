using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using CommonClientLibraries;
using CommonClientLibraries.UIManager;
using ZombieGame.Common.JSONObjects;
namespace ZombieGame.Client
{
    public class GameManager
    {
        public TileMapManager TileMapManager { get; set; }
        public TileManager TileManager { get; set; }
        public MapManager MapManager { get; set; }

        public GameManager()
        {
            TileMapManager = new TileMapManager(this);
            TileManager = new TileManager(this);
            MapManager = new MapManager(this);
        }

        public void LoadTiles(JsonTileMap jsonTileMap)
        {
            CHelp.LoadImageFromFile(jsonTileMap.TileMapFile, (image) =>
            {
                TileManager.LoadTiles(jsonTileMap, image);
            });
        }
        public GameMap LoadMap(JsonMap jsonMap)
        {
           return MapManager.LoadMap(jsonMap);
        }
    } 
    public class MapManager
    {
        public JsDictionary<string, GameMap> GameMaps { get; set; }

        public GameMap CurrentMap { get; set; }
        public MapManager(GameManager gameManager)
        {
            GameMaps = new JsDictionary<string, GameMap>();
        }

        public GameMap LoadMap(JsonMap jsonMap)
        {
            GameMap gameMap = new GameMap(jsonMap);
            GameMaps[gameMap.Name] = gameMap;
            return gameMap;
        }
    }
public class TileManager
    {
        private JsDictionary<string, Tile> loadedTiles;

        public TileManager(GameManager gameManager)
        {
            loadedTiles = new JsDictionary<string, Tile>();
        }

        public void LoadTiles(JsonTileMap jsonTileMap, ImageElement tileImage)
        {
            var canvas = CanvasInformation.Create(tileImage);

            for (int x = 0; x < tileImage.Width; x += jsonTileMap.TileWidth) {
                for (int y = 0; y < tileImage.Height; y += jsonTileMap.TileHeight) {
                    //load just the width x height image into a tile object for caching mostly. 
                    var tile = new Tile(canvas, x, y, jsonTileMap);
                    //store each tile in a hash of name-x-y
                    loadedTiles[tile.Key] = tile;
                }
            }
        }
    }
public class GameMap
{ 


    public GameMap(JsonMap jsonMap)
    {
        Name=jsonMap.Name;

    }

    public string Name { get; set; }
}
public class Tile
    {
        private JsonTileMap jsonMap;
        [IntrinsicProperty]
        public int TileMapY { get; set; }
        [IntrinsicProperty]
        public int TileMapX { get; set; }
        [IntrinsicProperty]
        public CanvasInformation Image { get; set; }
        public string Key
        {
            get { return string.Format("{0}-{1}-{2}", jsonMap.Name, TileMapX / jsonMap.TileWidth, TileMapY / jsonMap.TileHeight); }
        }

        public Tile(CanvasInformation canvas, int x, int y, JsonTileMap jsonMap)
        {
            this.jsonMap = jsonMap;
            TileMapX = x;
            TileMapY = y;
            var imageData = canvas.Context.GetImageData(x, y, jsonMap.TileWidth, jsonMap.TileHeight);

            var data = CanvasInformation.Create(imageData);

            Image = data;
        }
    }
    public class TileMapManager
    {
        [IntrinsicProperty]
        public MapTile[,] CurrentMapTiles { get; set; }
        public TileMapManager(GameManager gameManager) {}

        public void LoadArea(MapTile[,] tileMap)
        {
            CurrentMapTiles = tileMap;
        }

        public MapTile GetTileAt(int x, int y)
        {
            return CurrentMapTiles[x, y];
        }
    }
    public class MapTile {}
}