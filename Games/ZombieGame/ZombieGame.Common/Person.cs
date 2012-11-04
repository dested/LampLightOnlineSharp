using System.Html.Media.Graphics;
namespace ZombieGame.Common
{
    public class Person : Unit
    {
        public Person(GameManager gameManager) : base(gameManager) {}

        public override void Init()
        {
            MoveRate = 2.4d;
            base.Init();
        }

        public override void Draw(CanvasContext2D context)
        {
            context.Save();
            context.FillStyle = "blue";
            context.FillRect(X - 13, Y - 13, 26, 26);
            context.Restore();
        }
    }
}