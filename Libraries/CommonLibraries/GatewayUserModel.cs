using System;
using CommonAPI;
using SocketIOLibrary;
namespace CommonLibraries
{
    [Serializable]
    public class GatewayUserModel : UserModel
    {
        public SocketIOConnection Socket { get; set; }
        public string GameServer { get; set; }
        public string ChatServer { get; set; }
    }
}