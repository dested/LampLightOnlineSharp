using System.Html;
using System.Runtime.CompilerServices;
using CommonClientLibraries;
using CommonClientLibraries.UIManager;
using CommonLibraries;
using CommonWebLibraries;
using WebLibraries;
using jQueryApi;
namespace Server
{
    public class ServerManager
    {  
        private GameManager gameManager;  

        public ServerManager()
        { 
             

            gameManager = new GameManager();
             
            Window.SetInterval(Tick, 1000 / 10); 

            gameManager.Start( ); 
        }

        private static void Main()
        {
            new ServerManager(); ;
        }

        private void Tick()
        {
            gameManager.Tick();
        }
         
    }
}