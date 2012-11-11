using CommonAPI;
namespace CommonServerLibraries.Queue
{
    public class QueueMessage
    {
        public ChannelListenTriggerMessage Content; 
        public string Name;
        public UserModel User;

        public QueueMessage(string name, UserModel user, ChannelListenTriggerMessage content)
        {
            Name = name;
            User = user;
            Content = content;
        }
    }
}