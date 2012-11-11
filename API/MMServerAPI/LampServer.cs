using System.Collections.Generic;
using CommonAPI;
using CommonLibraries;
namespace MMServerAPI
{
    public class LampServer
    {
        protected readonly ServerGameManager myManager;
        public JsDictionary<int, List<LampAction>> Actions { get; set; }
        public int TickIndex { get; set; }
        public List<LampPlayer> Players { get; set; }

        protected LampServer(ServerGameManager manager)
        {
            myManager = manager;
            Actions = new JsDictionary<int, List<LampAction>>();
        }

        public virtual void Init()
        {
            Players = new List<LampPlayer>();
        }

        public void SendMessageToPlayer(LampPlayerMessage message, LampPlayer player)
        {
            myManager.ServerManager.Emit(player,message );

        }
        public void SendMessageToPlayers(LampPlayerMessage message,params LampPlayer[] players)
        {
            myManager.ServerManager.EmitAll(players.Cast<List<LampPlayer>>(), message);
            
        }

        public void ReceiveMessage(LampPlayerMessage message)
        {
            switch (message.Type) {
                case LampMessageType.Action:
                    LampAction lampAction = ( (LampAction) message );

                    List<LampAction> lampActions = Actions[lampAction.TickToInitiate] = Actions[lampAction.TickToInitiate] ?? new List<LampAction>();//set it and forget it!

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