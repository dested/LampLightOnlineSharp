using CommonAPI;
namespace CommonServerLibraries.Queue
{
    public delegate void QueueCallback(string name, UserModel user, ChannelMessage content);
}