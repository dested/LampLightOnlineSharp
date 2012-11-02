using System.Html.Media.Graphics;
namespace ZombieGame.Client
{
    public class Person : Unit
    {
        public override void Init()
        {
            MoveRate = 5;
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