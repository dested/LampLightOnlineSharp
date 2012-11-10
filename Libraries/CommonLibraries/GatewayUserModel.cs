using System.Runtime.CompilerServices;
using CommonAPI;
using SocketIOLibrary;
namespace CommonLibraries
{
    public class GatewayUserModel : UserModel
    {
        [IntrinsicProperty]
        public SocketIOConnection Socket { get; set; }
        [IntrinsicProperty]
        public string GameServer { get; set; }
        [IntrinsicProperty]
        public string ChatServer { get; set; }
    }
}