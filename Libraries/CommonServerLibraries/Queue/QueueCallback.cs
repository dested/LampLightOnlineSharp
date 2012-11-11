using CommonAPI;
namespace CommonServerLibraries.Queue
{
    public delegate void QueueCallback(string name,string queueChannel, UserModel user,  ChannelListenTriggerMessage content);
}