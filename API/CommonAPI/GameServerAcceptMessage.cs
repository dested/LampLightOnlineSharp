using System;
namespace CommonAPI
{
    [Serializable]
    public class GameServerAcceptMessage : ChannelMessage
    {
        public string GameServer { get; set; }

        public GameServerAcceptMessage()
        {
            Channel = "GameServer.Accept";
            GatewayChannel = "Game";
        }
    }
}