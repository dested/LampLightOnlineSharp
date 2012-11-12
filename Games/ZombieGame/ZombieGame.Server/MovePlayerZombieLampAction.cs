using System;
namespace ZombieGame.Server
{
    public class MovePlayerZombieLampAction : ZombieLampAction
    {
        public int X { get; set; }
        public int Y { get; set; }
        public override string Channel{get { return "Zombie.MovePlayer"; }}
    }
}