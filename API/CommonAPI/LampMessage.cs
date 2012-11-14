using System;
using System.Runtime.CompilerServices;
namespace CommonAPI
{
    [Serializable]
    public abstract class LampMessage : ChannelMessage
    {
        public LampMessageType Type { get; set; }
        [IntrinsicProperty]
        public LampPlayer User { get; set; }
    }
}