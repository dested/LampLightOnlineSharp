using CommonAPI;
namespace CommonServerLibraries.Queue
{
    public class QueueMessage
    {
        public ChannelMessage Content;
        public string Name;
        public UserModel User;

        public QueueMessage(string name, UserModel user, ChannelMessage content)
        {
            Name = name;
            User = user;
            Content = content;
        }
    }
}