using System;
namespace MMServerAPI
{
    [Serializable]
    public class LampAction : LampPlayerMessage
    {
        public int TickToInitiate { get; set; }
    }
}