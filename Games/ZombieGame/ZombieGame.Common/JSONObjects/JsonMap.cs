using System;
using System.Runtime.CompilerServices;
namespace ZombieGame.Common.JSONObjects
{
    [Serializable]
    [Imported]
    public class JsonMap
    {
        public string Name { get; set; }
        public int MapWidth { get; set; }
        public int MapHeight { get; set; }
        public string[][] TileMap { get; set; }
    }
}