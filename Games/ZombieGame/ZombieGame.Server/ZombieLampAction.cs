using System;
using CommonAPI;
namespace ZombieGame.Server
{
    public abstract class ZombieLampAction : LampAction
    {
        public ZombieActionType ZombieActionType { get; set; }
    }
}