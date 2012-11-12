using System;
using System.Runtime.CompilerServices;
namespace CommonAPI
{
    public delegate void ChannelListenTrigger(UserModel user, ChannelMessage model);
    public abstract class ChannelMessage
    {
        public abstract string Channel { get; }
        public abstract string GatewayChannel { get; }
    }
}