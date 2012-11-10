using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonClientLibraries;
using ZombieGame.Common;
using ZombieGame.Common.JSONObjects;
namespace ZombieGame.Client
{
    public class DrawTile : Tile
    {
        [IntrinsicProperty]
        public CanvasInformation Image { get; set; }

        public DrawTile(CanvasInformation canvas, int x, int y, JsonTileMap jsonMap) : base(x, y, jsonMap)
        {
            var imageData = canvas.Context.GetImageData(x, y, jsonMap.TileWidth, jsonMap.TileHeight);
            var data = CanvasInformation.Create(imageData);
            Image = data;
        }

        public void Draw(CanvasContext2D context, int _x, int _y, int mapX, int mapY)
        {
            context.Save();
            context.Translate(_x + mapX * ZombieGameConfig.TileSize, _y + mapY * ZombieGameConfig.TileSize);

/*
            context.Translate(ZombieGameConfig.TileSize / 2, ZombieGameConfig.TileSize / 2);
            //context.Rotate(fm);
            context.Translate(-ZombieGameConfig.TileSize / 2, -ZombieGameConfig.TileSize / 2);
*/
            context.DrawImage((CanvasElement) Image.Canvas, 0, 0);
/*
            context.StrokeStyle = "red";
            context.StrokeRect(0, 0, ZombieGameConfig.TileSize, ZombieGameConfig.TileSize);

            switch (Collision) {
                case CollisionType.Full:
                    context.FillStyle = "rgba(233,12,22,0.6)";
                    context.FillRect(0, 0, ZombieGameConfig.TileSize, ZombieGameConfig.TileSize);
                    break;
                case CollisionType.RightHalf:
                    context.FillStyle = "rgba(233,12,22,0.6)";
                    context.FillRect(ZombieGameConfig.TileSize / 2, 0, ZombieGameConfig.TileSize / 2, ZombieGameConfig.TileSize);
                    break;
                case CollisionType.TopHalf:
                    context.FillStyle = "rgba(233,12,22,0.6)";
                    context.FillRect(0, 0, ZombieGameConfig.TileSize, ZombieGameConfig.TileSize / 2);
                    break;
                case CollisionType.LeftHalf:
                    context.FillStyle = "rgba(233,12,22,0.6)";
                    context.FillRect(0, 0, ZombieGameConfig.TileSize / 2, ZombieGameConfig.TileSize);
                    break;
                case CollisionType.BottomHalf:
                    context.FillStyle = "rgba(233,12,22,0.6)";
                    context.FillRect(0, ZombieGameConfig.TileSize / 2, ZombieGameConfig.TileSize, ZombieGameConfig.TileSize / 2);
                    break;
            }
*/ //todo enable when some sort of edit mode is enabled

            context.Restore();
        }
    }
}