using System.Collections.Generic;
using CommonAPI;
using ZombieGame.Common.JSONObjects;
namespace ZombieGame.Common
{
    public class TileManager
    {
        private readonly GameManager myGameManager;
        protected JsDictionary<string, Tile> loadedTiles;

        public TileManager(GameManager gameManager)
        {
            myGameManager = gameManager;
            loadedTiles = new JsDictionary<string, Tile>();
        }

        public void LoadTiles(JsonTileMap jsonTileMap, Completed completed)
        {
            int height = jsonTileMap.MapHeight * jsonTileMap.TileHeight;
            int width = jsonTileMap.MapWidth * jsonTileMap.TileWidth;

            for (int x = 0; x < width; x += jsonTileMap.TileWidth) {
                for (int y = 0; y < height; y += jsonTileMap.TileHeight) {
                    //load just the xy width*height of the canvas into a tile object for caching mostly. 
                    var tile = new Tile(x, y, jsonTileMap);
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