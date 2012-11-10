using System;
using System.Html.Media.Graphics;
using ZombieGame.Common;
using ZombieGame.Common.JSONObjects;
namespace ZombieGame.Client
{
    public class DrawMapManager : MapManager
    {
        public DrawMapManager(GameManager gameManager, int totalRegionWidth, int totalRegionHeight)
                : base(gameManager, totalRegionWidth, totalRegionHeight) {}

        public override GameMap LoadMap(JsonMap jsonMap)
        {
            GameMap gameMap = new DrawGameMap(this, jsonMap);
            GameMaps[gameMap.Name] = gameMap;
            return gameMap;
        }

        public void Draw(CanvasContext2D context, int wX, int wY, int wWidth, int wHeight)
        {
            context.Save();

            wWidth = Math.Min(wWidth, myTotalRegionWidth);
            wHeight = Math.Min(wHeight, myTotalRegionHeight);

            foreach (var gameMapLayout in GameMapLayouts) {
                ( (DrawGameMap) gameMapLayout.GameMap ).Draw(context, gameMapLayout.X + wX, gameMapLayout.Y + wY, wWidth, wHeight);
            }

            context.Restore();
        }
    }
}