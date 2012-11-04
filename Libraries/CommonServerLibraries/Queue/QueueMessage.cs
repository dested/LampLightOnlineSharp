using CommonLibraries;
namespace CommonServerLibraries.Queue
{
    public class QueueMessage<T>
    {
        public T Content;
        public string EventChannel;
        public string Name;
        public UserModel User;


        public QueueMessage(string name, UserModel user, string eventChannel, T content)
        {
            Name = name;
            User = user;
            EventChannel = eventChannel;
            Content = content;
        }
    }
}