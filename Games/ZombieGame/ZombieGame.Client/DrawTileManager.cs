using System.Html;
using CommonAPI;
using CommonClientLibraries;
using ZombieGame.Common;
using ZombieGame.Common.JSONObjects;
namespace ZombieGame.Client
{
    public class DrawTileManager : TileManager
    {
        public DrawTileManager(GameManager gameManager)
                : base(gameManager) {}

        public void LoadTiles(JsonTileMap jsonTileMap, ImageElement tileImage, Completed completed)
        {
            var canvas = CanvasInformation.Create(tileImage);

            int height = jsonTileMap.MapHeight * jsonTileMap.TileHeight;
            int width = jsonTileMap.MapWidth * jsonTileMap.TileWidth;

            for (int x = 0; x < width; x += jsonTileMap.TileWidth) {
                for (int y = 0; y < height; y += jsonTileMap.TileHeight) {
                    //load just the xy width*height of the canvas into a tile object for caching mostly. 
                    var tile = new DrawTile(canvas, x, y, jsonTileMap);
                    //store each tile in a hash of name-x-y
                    loadedTiles[tile.Key] = tile;
                }
            }
            completed();
        }
    }
}