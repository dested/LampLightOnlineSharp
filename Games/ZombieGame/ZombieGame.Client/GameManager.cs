using System.Html.Media.Graphics;
using CommonClientLibraries.UIManager;
using ZombieGame.Common.JSONObjects;
namespace ZombieGame.Client
{
    public class GameManager
    {
        public TileManager TileManager { get; set; }
        public MapManager MapManager { get; set; }
        public WindowManager WindowManager { get; set; }

        public GameManager()
        {
            TileManager = new TileManager(this);
            MapManager = new MapManager(this,400,400);
            WindowManager = new WindowManager(0, 0, 300, 350);
        }

        public void LoadTiles(JsonTileMap jsonTileMap, Completed completed)
        {
            CHelp.LoadImageFromFile(jsonTileMap.TileMapFile,
                                    (image) => {
                                        TileManager.LoadTiles(jsonTileMap, image, completed);
                                    });
        }

 
        public void Draw(CanvasContext2D context)
        {

            MapManager.Draw(context);
        }
    }
}