using System;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonClientLibraries;
using ZombieGame.Common.JSONObjects;
namespace ZombieGame.Client
{
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
        public CollisionType Collision { get; set; }

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
            Collision = RandomCollision();
            Image = data;
        }

        private CollisionType RandomCollision()
        {
            if (Math.Random() * 100 < 35) {

                return (CollisionType) (int) ( Math.Random() * 4 +1);

            }
            return CollisionType.Empty;
        }

        public void Draw(CanvasContext2D context, int _x, int _y, int mapX, int mapY)
        {
            context.Save();
            context.Translate(_x + mapX * Game.TILESIZE, _y + mapY * Game.TILESIZE);

            context.Translate(Game.TILESIZE / 2, Game.TILESIZE / 2);
            //context.Rotate(fm);
            context.Translate(-Game.TILESIZE / 2, -Game.TILESIZE / 2);
            context.DrawImage(Image.Canvas, 0, 0);
            context.StrokeStyle = "red";
            context.StrokeRect(0, 0, Game.TILESIZE, Game.TILESIZE);

            switch (Collision)
            {
                case CollisionType.Full:
                    context.FillStyle = "rgba(233,12,22,0.6)";
                    context.FillRect(0, 0, Game.TILESIZE, Game.TILESIZE);
                    break;
                case CollisionType.RightHalf:
                    context.FillStyle = "rgba(233,12,22,0.6)";
                    context.FillRect(Game.TILESIZE / 2, 0, Game.TILESIZE / 2, Game.TILESIZE);
                    break;
                case CollisionType.TopHalf:
                    context.FillStyle = "rgba(233,12,22,0.6)";
                    context.FillRect(0, 0, Game.TILESIZE, Game.TILESIZE / 2);
                    break;
                case CollisionType.LeftHalf:
                    context.FillStyle = "rgba(233,12,22,0.6)";
                    context.FillRect(0, 0, Game.TILESIZE / 2, Game.TILESIZE);
                    break;
                case CollisionType.BottomHalf:
                    context.FillStyle = "rgba(233,12,22,0.6)";
                    context.FillRect(0, Game.TILESIZE / 2, Game.TILESIZE, Game.TILESIZE / 2);
                    break;
            }

            context.Restore();
        }

    }
}