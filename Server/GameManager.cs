using CommonAPI;
using MMServerAPI;
namespace MMServer
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