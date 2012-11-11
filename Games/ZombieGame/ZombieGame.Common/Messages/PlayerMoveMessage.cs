using System;
using CommonAPI;
namespace ZombieGame.Common.Messages
{
    [Serializable]
    public class PlayerMoveMessage : ChannelListenTriggerMessage
    {
        public static string MessageChannel = "Player.Move";
        public int X { get; set; }
        public int Y { get; set; }
        public PlayerMoveMessage()
        {
            Channel = MessageChannel;
            GatewayChannel = "Game";
        }
    }
    [Serializable]
    public class PlayerJoinMessage : ChannelListenTriggerMessage
    {
        public static string MessageChannel = "Player.Join";
        public PlayerJoinMessage()
        {
            Channel = MessageChannel;
            GatewayChannel = "Game";
        }
    }
    [Serializable]
    public class GameServerAcceptMessage : ChannelListenTriggerMessage
    {
        public static string MessageChannel = "GameServer.Accept";
        public string GameServer { get; set; }
        public GameServerAcceptMessage()
        {
            Channel = MessageChannel;
            GatewayChannel = "Client";
        }
    }
}