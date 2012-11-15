using System.Runtime.CompilerServices;
using ZombieGame.Common;
namespace ZombieGame.Client
{
    public class ActionManager
    {
        private readonly ClientGameManager myClientGameManager;
        [IntrinsicProperty]
        public int CurrentTick { get; set; }

        public ActionManager(ClientGameManager clientGameManager)
        {
            myClientGameManager = clientGameManager;
        }

        public void Init()
        {
            CurrentTick = 0; //pull from soiver
        }

        public void Tick()
        {
            CurrentTick++;
        }

        public void ScheduleAction(MovePlayerZombieLampAction movePlayerZombieLampAction)
        {
            movePlayerZombieLampAction.TickToInitiate = CurrentTick + 2;
            myClientGameManager.Game.SendChannelMessage(movePlayerZombieLampAction);

        }
    }
}