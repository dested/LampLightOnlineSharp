using System;
namespace ZombieGame.Server
{
    [Serializable]
    public class MovePlayerZombieLampAction : ZombieLampAction
    {
        public int X { get; set; }
        public int Y { get; set; }
    }
}