using System.Runtime.CompilerServices;
using CommonAPI;
namespace MMServerAPI
{
    public class ServerGameManager
    {
        private LampServer myGame;
        [IntrinsicProperty]
        public int Region { get; set; }
        [IntrinsicProperty]
        public IServerManager ServerManager { get; set; }

        public ServerGameManager(int region, IServerManager serverManager)
        {
            Region = region;
            ServerManager = serverManager;
        }

        public void Tick()
        {
            myGame.Tick();
        }

        public void Start(LampServer game)
        {
            myGame = game;
            myGame.Init(new LampPlayer[0]);
        }

        public void End()
        {
            myGame.End();
        }
    }
}