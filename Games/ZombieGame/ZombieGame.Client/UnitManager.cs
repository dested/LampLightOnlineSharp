using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonLibraries;
namespace ZombieGame.Client
{
    public class UnitManager
    {
        private readonly GameManager myGameManager;
        private Point CharacterCenterPadding = new Point(150, 150);
        [IntrinsicProperty]
        public Person MainCharacter { get; set; }

        public UnitManager(GameManager gameManager)
        {
            myGameManager = gameManager;
            MainCharacter = new Person() {
                                                 X = 100,
                                                 Y = 170,
                                                 UpdatePosition = (x, y) => { myGameManager.WindowManager.CenterAround(x, y); }
                                         };
        }

        public void Draw(CanvasContext2D context)
        {
            MainCharacter.Draw(context);
        }

        public void Init()
        {
            MainCharacter.Init();
        }

        public void Tick()
        {
            MainCharacter.Tick();
        }
    }
}