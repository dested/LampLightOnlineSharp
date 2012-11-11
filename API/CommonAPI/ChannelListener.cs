using System;
using System.Collections.Generic;
namespace CommonAPI
{
    public delegate void ChannelListener(string channel, ChannelListenTrigger trigger);

    public delegate void ChannelEmit(UserModel user, ChannelListenTriggerMessage model);
    public delegate void ChannelEmitAll(List<UserModel> user, ChannelListenTriggerMessage model);
    
    public delegate void ChannelListenTrigger(UserModel user, ChannelListenTriggerMessage model);
    [Serializable]
    public class ChannelListenTriggerMessage
    {
        public string Channel { get; set; }
    }
    [Serializable]
    public class GameServerCapabilities
    {
        public ChannelListener ListenOnChannel { get; set; }
        public ChannelEmit Emit { get; set; }
        public ChannelEmitAll EmitAll { get; set; }
    }

}