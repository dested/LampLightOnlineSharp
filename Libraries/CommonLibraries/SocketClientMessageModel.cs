using System.Runtime.CompilerServices;
using CommonAPI;
namespace CommonLibraries
{
    public class SocketClientMessageModel
    {
        [IntrinsicProperty]
        public string Channel { get; set; }
        [IntrinsicProperty]
        public ChannelListenTriggerMessage Content { get; set; }
        [IntrinsicProperty]
        public UserModel User { get; set; }

        public SocketClientMessageModel(UserModel user, string channel, ChannelListenTriggerMessage content)
        {
            User = user;
            Channel = channel;
            Content = content;
        }
    }
}