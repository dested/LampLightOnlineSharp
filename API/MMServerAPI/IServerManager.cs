using System.Collections.Generic;
using CommonAPI;
using CommonServerLibraries.Queue;
namespace MMServerAPI
{
    public interface IServerManager
    {
        void ListenOnChannel(string name, ChannelListenTrigger trigger);
        void Emit(LampPlayer player, ChannelListenTriggerMessage message);

        void EmitAll(IEnumerable<LampPlayer> players, ChannelListenTriggerMessage val);

        void Init();
        void End();
    }
}