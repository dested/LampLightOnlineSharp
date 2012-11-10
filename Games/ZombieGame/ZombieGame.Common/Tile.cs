using System;
using System.Runtime.CompilerServices;
using ZombieGame.Common.JSONObjects;
namespace ZombieGame.Common
{
    public class Tile
    {
        private JsonTileMap jsonMap;
        [IntrinsicProperty]
        public int TileMapY { get; set; }
        [IntrinsicProperty]
        public int TileMapX { get; set; }
        public string Key
        {
            get { return MakeKey(jsonMap.Name, TileMapX / jsonMap.TileWidth, TileMapY / jsonMap.TileHeight); }
        }
        public CollisionType Collision { get; set; }

        public Tile(int x, int y, JsonTileMap jsonMap)
        {
            this.jsonMap = jsonMap;
            TileMapX = x;
            TileMapY = y;

            Collision = RandomCollision();
        }

        public static string MakeKey(string name, int x, int y)
        {
            return string.Format("{0}-{1}-{2}", name, x, y);
        }

        private CollisionType RandomCollision()
        {
            if (Math.Random() * 100 < 35) return (CollisionType) (int) ( Math.Random() * 4 + 1 );
            return CollisionType.Empty;
        }
    }
}