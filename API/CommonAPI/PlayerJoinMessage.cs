namespace CommonAPI
{
    public class PlayerJoinMessage : ChannelMessage
    { 
        public override string Channel
        {
            get { return MessageChannel; }
        }
        public override string GatewayChannel
        {
            get { return "Game"; }
        }
        public const string MessageChannel = "Player.Join";

    }
}