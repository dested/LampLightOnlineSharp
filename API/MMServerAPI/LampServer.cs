using System.Collections.Generic;
using CommonAPI;
using CommonLibraries;
namespace MMServerAPI
{
    public abstract class LampServer
    {
        protected readonly IServerManager myManager;
        private readonly int myRegion;
        public JsDictionary<int, List<LampAction>> Actions { get; set; }
        public int TickIndex { get; set; }
        public List<LampPlayer> Players { get; set; }

        protected LampServer(int region, IServerManager manager)
        {
            myRegion = region;
            myManager = manager;

            Actions = new JsDictionary<int, List<LampAction>>();
        }

        public virtual void Init()
        {
            Players = new List<LampPlayer>();
        }

        public void SendMessageToPlayer(LampMessage message, LampPlayer player)
        {
            myManager.Emit(player, message);
        }

        public void SendMessageToPlayers(LampMessage message, params LampPlayer[] players)
        {
            myManager.EmitAll(players.Cast<List<LampPlayer>>(), message);
        }

        public void ReceiveMessage(LampMessage message)
        {
            switch (message.Type) {
                case LampMessageType.Action:
                    LampAction lampAction = ( (LampAction) message );

                    List<LampAction> lampActions = Actions[lampAction.TickToInitiate] = Actions[lampAction.TickToInitiate] ?? new List<LampAction>(); //set it and forget it!

                    lampActions.Add(lampAction);

                    break;
            }
        }

        public abstract void ExecuteAction(LampAction action);

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

        public abstract void GameTick();
        public abstract void End();
        public abstract void MakePlayerActive(LampPlayer lampPlayer);
    }
}