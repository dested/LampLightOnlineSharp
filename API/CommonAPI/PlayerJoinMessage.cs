using System;
namespace CommonAPI
{
    [Serializable]
    public class PlayerJoinMessage : ChannelMessage
    {
        public const string MessageChannel = "Player.Join";

        public PlayerJoinMessage()
        {
            Channel = MessageChannel;
            GatewayChannel = "Game";
        }
    }
}