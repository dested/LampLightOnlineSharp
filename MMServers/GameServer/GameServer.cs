using CommonLibraries;
using CommonServerLibraries;
using CommonServerLibraries.Queue;
using MMServer;
using MMServerAPI;
using NodeJSLibrary;
using Console = NodeJS.Console;
namespace MM.GameServer
{
    public class GameServer
    {
        private GameServerInfo myGameInfo;
        private IServerManager serverManager;

        public GameServer(int region)
        {
            string gameServerIndex = "GameServer" + Guid.NewGuid();
            myGameInfo = new GameServerInfo() {
                                                      DataManager = new DataManager(),
                                                      GameServerName = gameServerIndex,
                                                      QueueManager = new QueueManager(gameServerIndex),
                                              };

            serverManager = new ServerManager(region, myGameInfo);

            Global.Process.On("exit",
                              () => {
                                  serverManager.End();
                                  Console.Log("exiting game server " + gameServerIndex);
                              });

            serverManager.Init();
        }

        private static void Main()
        {
            int region = 1;
            new GameServer(region);
        }
    }
}
//ServerManager server needs to be able to take messages from their players connected
//and take game product messages from every other game server
//it must be able to emit to all players in the region, via gateway switching
//and also send product messages to every other game server 
//  the gameserver will join the channel "Region 9 Game Products"
//  he will organize the products into the correct tick execution
//"Player.Join"
//  "GameServer.AcceptPlayer"
//"player.move" from user
//  "player.moveto" as product
//this whole thing needs to be "action" driven. there needs to be an action queue that will 
//take these messages and queue them for execution (2 ticks ahead of now, defined in the message ideally)
//
//ex
//the client will click on tick 100
//he _knows_ his click wont be executed until 104
//he sets his _processing tick_ on the ActionChannelListenMessage whatever?
//the queue manager reads that and stores him in the right array
//excutes on that tick
//sets _execution tick_ to now+2 (104) 
//sends the message to all other game servers with the product
//sends the data to _all applicable players_
//  this will be determined by the players near the actioned player
//  players will store their near by players to be updated every 10 ticks (once a second)
//  possibly have some way to mitigate player sending this to another server
//      send this server one message that has all the players in it that need to receive this product message
//      that server sends the data out so the gameserver doesnt have to waste its _precious precious_ ticks on sending redis messages
//all other gameservers receive the product message and queues it in a product queue to be executed at the prescribed tick
//all applicable clients queue that message up as well
//game servers and players execute products at the _TOP_ of the execution tick, before all other actions are processed.
//
//the player move message
//  when the player clicks to move he builds his waypoint on the client and on the server at the same tick (now + 2)
//  in the mean time the client will just dumb-movetowardspoint with active collisions blocking him
//  the game server determines the waypoint and sends the _PRODUCT_ of that waypoint to all other game servers
//  this will contain the array of tile index changes and the tick it happens at based on the players movement logic
//  ex. [{x:8,y:8,tick:1949},{x:8,y:9,tick:1954},{x:8,y:10,tick:1957}]
//  each game server will queue up the product of these messages and execute them at the prescribed time, properly updating the game servers in sync
//  each applicable client will also receive the move player command and will build his _OWN_ waypoint for the player based on his state of the game.
//  the server will also send the product to assure the player ends in correct spot?