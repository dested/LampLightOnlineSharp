using System;
using System.Collections.Generic;
using CommonLibraries;
using CommonServerLibraries.Queue;
using NodeJS;
using NodeJSLibrary;
using Console = NodeJS.Console;
namespace MM.GameServer
{
    public class GameServer
    {

        private DataManager dataManager;
        private string gameServerIndex;
        private QueueManager qManager;


        public GameServer()
        {

            dataManager = new DataManager();

            gameServerIndex = "GameServer" + Guid.NewGuid(); 

            Global.Process.On("exit", () => Console.Log("exiting game server "+gameServerIndex));
 
            qManager = new QueueManager(gameServerIndex, new QueueManagerOptions(new[]
                {
                    new QueueWatcher("GameServer", null),
                    new QueueWatcher(gameServerIndex, null),
                }, new[]
                    {
                        "GameServer",
                        "GatewayServer",
                        "Gateway*"
                    }));


            qManager.AddChannel<JoinGameRequestModel>("Area.Game.Join",
                                                      (user, data) =>
                                                      { 
                                                          EmitAll(room, "Area.Game.RoomInfo", room.CleanUp());
                                                      });
              
        }
 
 
          
       /* private void EmitAll(GameRoom room, string message, object val)
        {
            foreach (var player in room.Players)
            {
                qManager.SendMessage(player, player.Gateway, message, val);
            }
        }*/
         


        private static void Main()
        {
            new GameServer();
        }
    }
}