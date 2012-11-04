using System.Collections.Generic;
using System.Html;
using CommonAPI;
using CommonClientLibraries;
using ZombieGame.Common.JSONObjects;
namespace ZombieGame.Common
{
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
}