namespace CommonAPI
{
    public interface IServerManager
    {
        void ListenOnChannel(string name, ChannelListenTrigger trigger);
        void Init();
        void End();
    }
}