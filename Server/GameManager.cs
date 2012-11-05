using System.Html.Media.Graphics;
using CommonAPI;
using CommonClientLibraries.UIManager;
using CommonLibraries;
using MMServerAPI;
using WebLibraries;

namespace Server
{
    internal class GameManager
    {
        private LampServer game; 

        public GameManager()
        {
            game = new ZombieGame.Server.Game();
        }
         

        public void Tick()
        {
            game.Tick();
        }

        public void Start( )
        {
            game.Init(new LampPlayer[0]);
        }
    }
}