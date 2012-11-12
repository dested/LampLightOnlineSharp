using System;
using System.Runtime.CompilerServices;
namespace CommonAPI
{
    public abstract class LampActionProduct : LampMessage
    {
        public override LampMessageType Type
        {
            get { return LampMessageType.Product; }
        }
        public override string GatewayChannel { get { return "Game"; } }
    }
    public abstract class LampAction : LampMessage
    {
        public int TickToInitiate { get; set; }
        public override LampMessageType Type
        {
            get { return LampMessageType.Action; }
        }
         public override string GatewayChannel{get { return "Game"; }}
    } 
    public abstract class LampMessage : ChannelMessage
    { 
        public abstract LampMessageType Type { get; }
        [IntrinsicProperty]
        public LampPlayer User { get; set; }
    }
    public enum LampMessageType
    {
        Action = 0,
        Product = 1
    }
}