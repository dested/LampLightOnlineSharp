using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonClientLibraries;
using CommonClientLibraries.UIManager;
using ZombieGame.Common.JSONObjects;
namespace ZombieGame.Client
{
    public delegate void Completed();
    public class GameManager
    {
        public TileManager TileManager { get; set; }
        public MapManager MapManager { get; set; }

        public GameManager()
        {
            TileManager = new TileManager(this);
            MapManager = new MapManager(this);
        }

        public void LoadTiles(JsonTileMap jsonTileMap,Completed completed)
        {
            CHelp.LoadImageFromFile(jsonTileMap.TileMapFile, (image) => {
                TileManager.LoadTiles(jsonTileMap, image, completed);
                                                             });
        }

        public GameMap LoadMap(JsonMap jsonMap)
        {
            return MapManager.LoadMap(jsonMap);
        }

        public void Draw(CanvasContext2D context)
        {

            MapManager.Draw(context);
        }
    }
    public class MapManager
    {
        internal readonly GameManager myGameManager;
        public JsDictionary<string, GameMap> GameMaps { get; set; }
        public GameMap LoadedMap { get; set; } 

        public MapManager(GameManager gameManager)
        {
            myGameManager = gameManager;
            GameMaps = new JsDictionary<string, GameMap>();
        }

        public GameMap LoadMap(JsonMap jsonMap)
        {
            GameMap gameMap = new GameMap(this, jsonMap);
            GameMaps[gameMap.Name] = gameMap;
            return gameMap;
        }

        public void Draw(CanvasContext2D context)
        {
            GameMaps["Pretties"].Draw(context,0,0);
            GameMaps["Pretties2"].Draw(context, GameMaps["Pretties"].MapWidth * GameMaps["Pretties"].TileMap[0, 0].Image.Canvas.Width, 0);


        }
    }
    public class TileManager
    {
        private readonly GameManager myGameManager;
        private JsDictionary<string, Tile> loadedTiles;

        public TileManager(GameManager gameManager)
        {
            myGameManager = gameManager;
            loadedTiles = new JsDictionary<string, Tile>();
        }

        public void LoadTiles(JsonTileMap jsonTileMap, ImageElement tileImage, Completed completed)
        {
            var canvas = CanvasInformation.Create(tileImage);

            for (int x = 0; x < tileImage.Width; x += jsonTileMap.TileWidth) {
                for (int y = 0; y < tileImage.Height; y += jsonTileMap.TileHeight) {
                    //load just the xy width*height of the canvas into a tile object for caching mostly. 
                    var tile = new Tile(canvas, x, y, jsonTileMap);
                    //store each tile in a hash of name-x-y
                    loadedTiles[tile.Key] = tile;
                }
            }
            completed();
        }

        public Tile GetTileByKey(string key)
        {
            return loadedTiles[key];
        }
    }
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
        public Tile[,] TileMap { get; set; }

        public GameMap(MapManager mapManager, JsonMap jsonMap)
        {
            myMapManager = mapManager;
            Name = jsonMap.Name;
            MapWidth = jsonMap.MapWidth;
            MapHeight = jsonMap.MapHeight;
            TileMap = new Tile[MapWidth,MapHeight];
            for (int x = 0; x < MapWidth; x++) {
                for (int y = 0; y < MapHeight; y++) {
                    string key = jsonMap.TileMap[x][y];
                    var tile = myMapManager.myGameManager.TileManager.GetTileByKey(key);
                    TileMap[x, y] = tile;
                }
            }
        }

        public Tile GetTileAt(int x, int y)
        {
            return TileMap[x, y];
        }
         

        public void Draw(CanvasContext2D context, int _x, int _y)
        {
            context.Save();
            context.Scale(2,2); 
            for (int x = 0; x < MapWidth; x++) {
                for (int y = 0; y < MapHeight; y++) {
                    Tile tile = TileMap[x, y];
                    context.Save();
                    context.Translate(_x + x * tile.Image.Canvas.Width, _y + y * tile.Image.Canvas.Height);

                    context.Translate(tile.Image.Canvas.Width / 2, tile.Image.Canvas.Height / 2);
                    //context.Rotate(fm);
                    context.Translate(-tile.Image.Canvas.Width / 2, -tile.Image.Canvas.Height / 2);
                    context.DrawImage(tile.Image.Canvas, 0,0);
                    context.StrokeStyle = "red";
                    context.StrokeRect(0, 0, tile.Image.Canvas.Width, tile.Image.Canvas.Height);
                    context.Restore();
                }
            }
            context.Restore();

        }
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
            get { return MakeKey(jsonMap.Name, TileMapX / jsonMap.TileWidth, TileMapY / jsonMap.TileHeight); }
        }

        public static string MakeKey(string name, int x, int y)
        {
            return string.Format("{0}-{1}-{2}", name, x, y);
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
 }