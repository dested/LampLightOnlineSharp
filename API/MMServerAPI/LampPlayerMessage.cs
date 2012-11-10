using System;
using CommonAPI;
namespace MMServerAPI
{
    [Serializable]
    public class LampPlayerMessage
    {
        public LampPlayer Player { get; set; }
        public LampMessageType Type { get; set; }
        public LampMessage Message { get; set; }
    }
}