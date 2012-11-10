using System;
using CommonAPI;
namespace ZombieGame.Common
{
    [Serializable]
    public class PlayerMoveMessage : ChannelListenTriggerMessage
    {
        public int X { get; set; }
        public int Y { get; set; }
    }
    [Serializable]
    public class PlayerJoinMessage : ChannelListenTriggerMessage {}
    [Serializable]
    public class GameServerAcceptMessage : ChannelListenTriggerMessage
    {
        public string GameServer { get; set; }
    }
}