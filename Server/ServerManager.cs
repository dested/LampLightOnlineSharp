using System.Html;
namespace MMServer
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