using System.Collections.Generic;
using CommonAPI;
using CommonLibraries;
using CommonServerLibraries.Queue;
using MMServerAPI;
using NodeJSLibrary;
using ZombieGame.Server;
namespace MMServer
{
    public class ServerManager : IServerManager
    {
        private readonly int myRegion;
        private readonly QueueManager myQueueManager;
        private LampServer myGame;

        public ServerManager(int region, QueueManager queueManager)
        {
            myRegion = region;
            myQueueManager = queueManager;
        }

        #region IServerManager Members

        public void Init()
        {
            //probably some big game switch to determine which "Game" to run. 
            myGame = new Game(myRegion,this);
            myGame.Init();
            Global.SetInterval(Tick, 1000 / 10); //needs to be incredibly high resolution. c++ lib
        }

        public void End()
        {
            myGame.End();
        }


        public void ListenOnChannel(string channel, ChannelListenTrigger trigger)
        {
            myQueueManager.AddChannel(channel, trigger);
        }

        public void Emit(LampPlayer player, ChannelListenTriggerMessage val)
        {
            myQueueManager.SendMessage(player, player.Gateway, val);
        }

        public void EmitAll(IEnumerable<LampPlayer> players, ChannelListenTriggerMessage val)
        {
            foreach (var player in players)
            {
                myQueueManager.SendMessage(player, player.Gateway, val);
            }
        }
        #endregion

        private void Tick()
        {
            myGame.Tick();
        }
    }
}