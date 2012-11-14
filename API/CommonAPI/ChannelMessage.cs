using System;
namespace CommonAPI
{
    [Serializable]
    public abstract class ChannelMessage
    {
        public string Channel { get; set; }
        public string GatewayChannel { get; set; }
    }
}