using System.Collections.Generic;
using CommonAPI;
namespace MMServerAPI
{
    public interface IServerManager
    {
        void ListenOnChannel(string name, ChannelListenTrigger trigger);
        void Emit(LampPlayer player, ChannelMessage message);
        void EmitAll(IEnumerable<LampPlayer> players, ChannelMessage val);
        void Init();
        void End();
    }
}