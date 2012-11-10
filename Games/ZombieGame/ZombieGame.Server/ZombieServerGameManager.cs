using System.Runtime.CompilerServices;
using CommonAPI;
using ZombieGame.Common;
using ZombieGame.Common.JSONObjects;
namespace ZombieGame.Server
{
    public class ZombieServerGameManager : GameManager
    {
        [IntrinsicProperty]
        public Game Game { get; set; }

        public ZombieServerGameManager(Game game)
        {
            Game = game;
        }

        public void LoadTiles(JsonTileMap jsonTileMap, Completed completed)
        {
            TileManager.LoadTiles(jsonTileMap, completed);
        }
    }
}