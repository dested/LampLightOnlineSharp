using CommonLibraries;
using NodeJSLibrary;
using Console = NodeJS.Console;
namespace GameServer
{
    public class GameServer
    {
        private DataManager dataManager;
        private string gameServerIndex;

        public GameServer()
        {
            dataManager = new DataManager();

            gameServerIndex = "GameServer" + Guid.NewGuid();
            Global.Process.On("exit", () => Console.Log("exi"));
        }

        private static void Main()
        {
            new GameServer();
        }
    }
}