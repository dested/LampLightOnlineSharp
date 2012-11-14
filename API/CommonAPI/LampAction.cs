using System;
namespace CommonAPI
{
    [Serializable]
    public abstract class LampAction : LampMessage
    {
        public int TickToInitiate { get; set; }

        protected LampAction()
        {
            GatewayChannel = "Game";
            Type = LampMessageType.Action;
        }
    }
}