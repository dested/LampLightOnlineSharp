using System;
using CommonAPI;
namespace ZombieGame.Common
{
    [Serializable]
    public abstract class ZombieLampAction : LampAction
    {
        public ZombieActionType ZombieActionType { get; set; }
    }
}