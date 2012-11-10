using System.Html.Media.Graphics;
using ZombieGame.Common;
namespace ZombieGame.Client
{
    public class DrawUnitManager : UnitManager
    {
        public DrawUnitManager(GameManager gameManager)
                : base(gameManager) {}

        public void Draw(CanvasContext2D context)
        {
            MainCharacter.Draw(context);
        }
    }
}