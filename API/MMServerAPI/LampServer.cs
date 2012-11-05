using System;
using System.Collections.Generic;
using CommonAPI;
namespace MMServerAPI
{
    public class LampServer
    {
        
            
        public JsDictionary<int, List<LampAction>> Actions { get; set; }
        public int TickIndex { get; set; }
        public LampPlayer[] Players { get; set; }
        public virtual void Init(LampPlayer[] players)
        {
            Players = players;
        }
        public void SendMessageToPlayer(LampPlayer player) {}
        public void SendMessageToPlayers(params LampPlayer[] player) {}

        public void ReceiveMessage(LampPlayerMessage message)
        {
            switch (message.Type) {
                case LampMessageType.Action:
                    LampAction lampAction = ( (LampAction) message );

                    List<LampAction> lampActions = Actions[lampAction.TickToInitiate];
                    if (lampActions == null) Actions[lampAction.TickToInitiate] = lampActions = new List<LampAction>();
                    lampActions.Add(lampAction);

                    break;
            }
        }

        public virtual void ExecuteAction(LampAction action)
        {
            
        }

        public void Tick()
        {
            var acts = Actions[TickIndex++];
            GameTick();
            foreach (var lampAction in acts) {
                ExecuteAction(lampAction);
                }
            Actions.Remove(TickIndex - 1);
        }

        public virtual void GameTick()
        {

        }
    }
    [Serializable]
    public class LampAction : LampPlayerMessage
    {
        public int TickToInitiate { get; set; } 
    }
    [Serializable]
    public class LampPlayerMessage
    {
        public LampPlayer Player { get; set; }
        public LampMessageType Type { get; set; }
        public LampMessage Message { get; set; }
    }
    public class LampMessage {}
    public enum LampMessageType
    {
        Action = 0
    }
}