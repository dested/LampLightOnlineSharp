using System.Collections.Generic;
using CommonAPI;
using CommonServerLibraries;
using CommonServerLibraries.Queue;
using MMServerAPI;
using NodeJSLibrary;
using ZombieGame.Server;
namespace MMServer
{
    public class ServerManager : IServerManager
    {
        private readonly GameServerInfo myGameServerInfo;
        private readonly int myRegion;
        private LampServer myGame;

        public ServerManager(int region, GameServerInfo gameServerInfo)
        {
            myRegion = region;
            myGameServerInfo = gameServerInfo;
        }

        #region IServerManager Members

        public void Init()
        {
            myGameServerInfo.QueueManager.AddPusher(new QueuePusher("GameServerProducts"));
            myGameServerInfo.QueueManager.AddPusher(new QueuePusher("Gateway*"));

            myGameServerInfo.QueueManager.AddWatcher(new QueueWatcher("GameServer", gameServerMessage));
            myGameServerInfo.QueueManager.AddWatcher(new QueueWatcher(myGameServerInfo.GameServerName, gameServerIndexMessage));
            myGameServerInfo.QueueManager.AddWatcher(new QueueWatcher("GameServerProducts", gameServerProductMessage));

            //probably some big game switch to determine which "Game" to run. 
            myGame = new Game(myRegion, this);
            myGame.Init();
            Global.SetInterval(Tick, 1000 / 10); //needs to be incredibly high resolution. c++ lib
        }

        public void End()
        {
            myGame.End();
        }

        public void ListenOnChannel(string channel, ChannelListenTrigger trigger)
        {
            myGameServerInfo.QueueManager.AddChannel(channel, trigger);
        }

        public void Emit(LampPlayer player, ChannelMessage val)
        {
            myGameServerInfo.QueueManager.SendMessage(player, player.Gateway, val);
        }

        public void EmitAll(IEnumerable<LampPlayer> players, ChannelMessage val)
        {
            foreach (var player in players) {
                myGameServerInfo.QueueManager.SendMessage(player, player.Gateway, val);
            }
        }

        #endregion

        private void gameServerProductMessage(string name, UserModel user, ChannelMessage content)
        {
            var player = (LampPlayer) user;
        }

        private void gameServerIndexMessage(string name, UserModel user, ChannelMessage content)
        {
            LampMessage message = (LampMessage) content;
            message.User = (LampPlayer) user;
            myGame.ReceiveMessage(message);
        }

        private void gameServerMessage(string name, UserModel user, ChannelMessage content)
        {
            switch (content.Channel) {
                case PlayerJoinMessage.MessageChannel:
                    var c = (PlayerJoinMessage) content;
                    var lampPlayer = new LampPlayer(user);
                    myGame.MakePlayerActive(lampPlayer);
                    PushPlayerMessage(lampPlayer, new GameServerAcceptMessage() {GameServer = myGameServerInfo.GameServerName});
                    break;
            }
        }

        private void PushPlayerMessage(LampPlayer user, ChannelMessage message)
        {
            myGameServerInfo.QueueManager.SendMessage(user, user.Gateway, message);
        }

        public void PushProduct(LampActionProduct product, IEnumerable<LampPlayer> applicablePlayers)
        {
/*
            myGameServerInfo.QueueManager.SendMessage("GameServerProducts", product);*/
        }

        private void Tick()
        {
            myGame.Tick();
        }
    }
}