using System.Collections.Generic;
using CommonAPI;
using CommonLibraries;
using MMServerAPI;
using NodeJSLibrary;
using ZombieGame.Server;
namespace MMServer
{
    public class ServerManager : IServerManager
    {
        private readonly GameServerCapabilities myGameServerCapabilities;
        private ServerGameManager myServerGameManager;

        public ServerManager(int region, GameServerCapabilities gameServerCapabilities)
        {
            myGameServerCapabilities = gameServerCapabilities;

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
            myGameServerCapabilities.ListenOnChannel(name, trigger);
        }
        public void Emit(LampPlayer player,  ChannelListenTriggerMessage message)
        {
            myGameServerCapabilities.Emit(player, message);
        }
        public void EmitAll(List<LampPlayer> players,  ChannelListenTriggerMessage message)
        {
            myGameServerCapabilities.EmitAll(new List<UserModel>(players), message);
        }
 
        #endregion

        private void Tick()
        {
            myServerGameManager.Tick();
        }
    }
}