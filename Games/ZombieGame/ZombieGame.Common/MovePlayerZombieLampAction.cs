using System;
namespace ZombieGame.Common
{
    [Serializable]
    public class MovePlayerZombieLampAction : ZombieLampAction
    {
        public int X { get; set; }
        public int Y { get; set; }
        public string MessageChannel
        {
            get { return "Zombie.MovePlayer"; }
        }

        public MovePlayerZombieLampAction()
        {
            Channel = MessageChannel;
        }
    }
}