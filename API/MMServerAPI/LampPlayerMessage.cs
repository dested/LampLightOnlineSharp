using System;
using CommonAPI;
namespace MMServerAPI
{
    [Serializable]
    public class LampPlayerMessage:ChannelListenTriggerMessage
    {
        public LampPlayer Player { get; set; }
        public LampMessageType Type { get; set; }
        public LampMessage Message { get; set; }
    }
}