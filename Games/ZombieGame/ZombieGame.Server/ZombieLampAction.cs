using System;
using MMServerAPI;
namespace ZombieGame.Server
{
    [Serializable]
    public class ZombieLampAction : LampAction
    {
        public ZombieActionType ZombieActionType { get; set; }
    }
}