using SocketIOLibrary;
namespace CommonShuffleLibrary
{
    public class UserModel
    {
        public string Gateway { get; set; }
        public string UserName { get; set; }
        public SocketIOConnection Socket { get; set; }
    }
}