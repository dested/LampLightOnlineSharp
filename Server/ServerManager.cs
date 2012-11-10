using CommonAPI;
using MMServerAPI;
using NodeJSLibrary;
using ZombieGame.Server;
namespace MMServer
{
    public class ServerManager : IServerManager
    {
        private readonly ChannelListener myOnChannel;
        private ServerGameManager myServerGameManager;

        public ServerManager(int region, ChannelListener onChannel)
        {
            myOnChannel = onChannel;

            myServerGameManager = new ServerGameManager(region, this);
        }

        #region IServerManager Members

        public void Init()
        {
            //probably some big game switch to determine which "Game" to run. 
            myServerGameManager.Start(new Game(myServerGameManager));
            Global.SetInterval(Tick, 1000 / 10); //needs to be incredibly high resolution. c++ lib
        }

        public void End()
        {
            myServerGameManager.End();
        }

        public void ListenOnChannel(string name, ChannelListenTrigger trigger)
        {
            myOnChannel(name, trigger);
        }

        #endregion

        private void Tick()
        {
            myServerGameManager.Tick();
        }
    }
}