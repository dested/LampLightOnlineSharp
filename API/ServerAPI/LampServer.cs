using System;
using CommonAPI;
namespace ServerAPI
{
    public class LampServer
    {
        public Action<LampPlayerMessage> ReceiveMessage { get; set; }
        public virtual void Init(LampPlayer[] players) {}
        public void SendMessageToPlayer(LampPlayer player) {}
        public void SendMessageToPlayers(params LampPlayer[] player) {}
    }
}