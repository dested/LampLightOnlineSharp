using System;
using CommonAPI;
namespace MMServerAPI
{
    public class LampServer
    {
        public virtual void Init(LampPlayer[] players) { }
        public void SendMessageToPlayer(LampPlayer player) { }
        public void SendMessageToPlayers(params LampPlayer[] player) { }
        public Action<LampPlayerMessage> ReceiveMessage { get; set; }

        public void Tick()
        {
        

        }
    }
}