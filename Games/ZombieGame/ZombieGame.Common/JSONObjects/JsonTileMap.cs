using System;
using System.Runtime.CompilerServices;
namespace ZombieGame.Common.JSONObjects
{
    [Serializable]
    [NonScriptable]
    public class JsonTileMap
    {
        public string TileMapFile { get; set; }
        public int TileWidth { get; set; }
        public int TileHeight { get; set; }
        public int[,] TileMap { get; set; }
        public string Name { get; set; }
    }
    [Serializable]
    [NonScriptable]
    public class JsonMap
    {
        public string Name { get; set; }
    }

}