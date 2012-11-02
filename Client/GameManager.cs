using System.Html.Media.Graphics;
using ClientAPI;
using CommonAPI;
using CommonClientLibraries.UIManager;
using CommonLibraries; 
using WebLibraries;
using jQueryApi;
namespace Client
{
    internal class GameManager
    {
        private LampClient game;
        public Rectangle WindowLocation { get; set; }

        public GameManager()
        {
          //  game = new TowerD.Client.Game();
          //  game = new ZombieGame.Client.Game();
            game = new ZakGame.Client.Game();

        }

        public bool MouseMove(jQueryEvent queryEvent)
        {
            return game.MouseMove(queryEvent);
        }

        public void BuildUI(UIManager uiManager)
        {
            game.BuildUI(uiManager);
        }

        public bool OnClick(jQueryEvent queryEvent)
        {
            return game.OnClick(queryEvent);
        }

        public bool MouseUp(jQueryEvent queryEvent)
        {
            return game.MouseUp(queryEvent);
        }

        public void Draw(CanvasContext2D context)
        {
            game.Draw(context);
        }

        public void Tick()
        {
            game.Tick();
        }

        public void Start(CanvasContext2D context)
        {
            game.WindowLocation = WindowLocation;
            game.Init(new LampPlayer[0], context);
            game.BindKeys(KeyboardJS.Instance());
        }
    }
}