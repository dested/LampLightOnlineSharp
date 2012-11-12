using System;
using CommonServerLibraries.Queue;
namespace CommonServerLibraries
{
    [Serializable]
    public class GameServerInfo
    {
        public DataManager DataManager { get; set; }
        public QueueManager QueueManager { get; set; }
        public string GameServerName { get; set; }
    }
}