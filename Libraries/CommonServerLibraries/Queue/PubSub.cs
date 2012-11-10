using System;
using System.Runtime.CompilerServices;
using NodeJSLibrary;
using Redis;
namespace CommonServerLibraries.Queue
{
    public class PubSub
    {
        private bool pready;
        private RedisClient pubClient;
        private bool sready;
        private RedisClient subClient;
        private dynamic subbed;

        public PubSub(Action ready)
        {
            subbed = new object();
            var someSubbed = subbed;

            var redis = Global.Require<RedisModule>("redis");
            redis.DebugMode = false;
            subClient = redis.CreateClient(6379, IPs.RedisIP);
            pubClient = redis.CreateClient(6379, IPs.RedisIP);
            subClient.On("subscribe", new Action<string, int>((channel, count) => Global.Console.Log("subscribed: " + channel + " " + count)));
            subClient.On("unsubscribe", new Action<string, int>((channel, count) => Global.Console.Log("unsubscribed: " + channel + " " + count)));

            subClient.On("message",
                         new Action<string, object>((channel, message) => {
                                                        if (someSubbed[channel] != null)
                                                            someSubbed[channel](message);
                                                    }));
            subClient.On("ready",
                         new Action(() => {
                                        sready = true;
                                        if (sready && pready)
                                            ready();
                                    }));
            pubClient.On("ready",
                         new Action(() => {
                                        pready = true;
                                        if (sready && pready)
                                            ready();
                                    }));
        }

        public void Publish(string channel, string content)
        {
            pubClient.Publish(channel, content);
        }

        [IgnoreGenericArguments]
        public void Subscribe<T>(string channel, Action<T> callback)
        {
            subClient.Subscribe(channel);
            subbed[channel] = callback;
        }
    }
}