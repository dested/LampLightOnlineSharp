using System;
using System.Runtime.CompilerServices;
using CommonAPI;
namespace CommonLibraries
{
    [Serializable]
    public class GatewayMessageModel
    {
        [IntrinsicProperty]
        public string Channel { get; set; }
        [IntrinsicProperty]
        public ChannelListenTriggerMessage Content { get; set; }

        public GatewayMessageModel(string channel, ChannelListenTriggerMessage content)
        {
            Channel = channel;
            Content = content;
        }
    }
}