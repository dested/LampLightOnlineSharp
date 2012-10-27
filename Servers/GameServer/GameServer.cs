using System;
using System.Collections.Generic;
using System.Serialization;
using System.Text;
using CommonLibraries;
using CommonShuffleLibrary;
using CommonWebLibraries;
using NodeJSLibrary;

namespace GameServer
{
    public class GameServer
    {
        static void Main()
        {
            new GameServer();
        }


        private string gameServerIndex;
        private QueueManager qManager;
        private DataManager dataManager;

        public GameServer()
        {   

            dataManager = new DataManager();

            gameServerIndex = "GameServer" + Guid.NewGuid(); 
            Global.Process.On("exit", () => Console.Log("exi"));
   
             
        }
          

     }
}
