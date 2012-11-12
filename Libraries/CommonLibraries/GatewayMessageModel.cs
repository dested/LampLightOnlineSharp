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
        public ChannelMessage Content { get; set; }

        public GatewayMessageModel(string channel, ChannelMessage content)
        {
            Channel = channel;
            Content = content;
        }
    }
}