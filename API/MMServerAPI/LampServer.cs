using System.Collections.Generic;
using CommonAPI;
namespace MMServerAPI
{
    public class LampServer
    {
        protected readonly ServerGameManager myManager;
        public JsDictionary<int, List<LampAction>> Actions { get; set; }
        public int TickIndex { get; set; }
        public LampPlayer[] Players { get; set; }

        protected LampServer(ServerGameManager manager)
        {
            myManager = manager;
            Actions = new JsDictionary<int, List<LampAction>>();
        }

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

        public virtual void ExecuteAction(LampAction action) {}

        public void Tick()
        {
            var acts = Actions[TickIndex++];
            GameTick();
            if (acts != null) {
                foreach (var lampAction in acts) {
                    ExecuteAction(lampAction);
                }
            }
            Actions.Remove(TickIndex - 1);
        }

        public virtual void GameTick() {}
        public void End() {}
    }
}