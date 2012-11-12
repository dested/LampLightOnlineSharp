using System;
namespace CommonAPI
{
    public class GameServerAcceptMessage : ChannelMessage
    { 
        public string GameServer { get; set; } 
        public override string Channel
        {
            get { return "GameServer.Accept"; }
        }
        public override string GatewayChannel
        {
            get { return "Game"; }
        }
     
    }
}