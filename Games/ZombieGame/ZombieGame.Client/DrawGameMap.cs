using System.Html.Media.Graphics;
using CommonLibraries;
using ZombieGame.Common;
using ZombieGame.Common.JSONObjects;
namespace ZombieGame.Client
{
    public class DrawGameMap : GameMap
    {
        public DrawGameMap(MapManager mapManager, JsonMap jsonMap)
                : base(mapManager, jsonMap) {}

        public void Draw(CanvasContext2D context, int tileX, int tileY, int wWidth, int wHeight)
        {
            context.Save();

            for (int x = tileX; x < wWidth; x++) {
                for (int y = tileY; y < wHeight; y++) {
                    DrawTile tile = (DrawTile) TileMap.GetSafe(x, y);
                    if (tile == null)
                        continue;
                    tile.Draw(context, tileX, tileY, x, y);
                }
            }
            context.Restore();
        }
    }
}