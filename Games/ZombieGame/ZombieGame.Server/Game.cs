using System;
using System.Runtime.CompilerServices;
using CommonAPI;
using MMServerAPI;
namespace ZombieGame.Server
{
    public class Game : LampServer
    {
        public Game()
        {
            
        }

        public override void Init(LampPlayer[] players)
        {
            base.Init(players);
        }
        public override void GameTick()
        {
            
        }

        public override void ExecuteAction(LampAction action)
        {
            var zAction = (ZombieLampAction) action;

            switch (zAction.ZombieActionType) {
                case ZombieActionType.MovePlayer:
                    //zAction.Player
                    break;
            }

            base.ExecuteAction(action);
        }
    }
    [Serializable]
    public class MovePlayerZombieLampAction : ZombieLampAction
    {
        public int X { get; set; }
        public int Y { get; set; }
    }
    [Serializable]
    public class ZombieLampAction : LampAction
    {
        public ZombieActionType ZombieActionType { get; set; }
    }
    public enum ZombieActionType
    {MovePlayer=0
        
    }
}