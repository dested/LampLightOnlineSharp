using System.Collections.Generic;
namespace CommonAPI
{
    public interface IServerManager
    {
        void ListenOnChannel(string name, ChannelListenTrigger trigger);
        void Emit(LampPlayer player,  ChannelListenTriggerMessage message);

        void EmitAll(List<LampPlayer> players,  ChannelListenTriggerMessage message);
      
        void Init();
        void End();
    }
}