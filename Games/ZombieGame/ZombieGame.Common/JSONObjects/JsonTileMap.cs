using System;
using System.Runtime.CompilerServices;
namespace ZombieGame.Common.JSONObjects
{
    [Serializable]
    [Imported]
    public class JsonTileMap
    {
        public string TileMapURL { get; set; }
        public int TileWidth { get; set; }
        public int MapHeight { get; set; }
        public int MapWidth { get; set; }
        public int TileHeight { get; set; }
        public string Name { get; set; }
    }
}