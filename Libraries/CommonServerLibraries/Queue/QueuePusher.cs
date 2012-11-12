using System.Serialization;
using CommonAPI;
using CommonLibraries;
using NodeJSLibrary;
using Redis;
namespace CommonServerLibraries.Queue
{
    public class QueuePusher : QueueItem
    {
        private RedisClient client1;

        public QueuePusher(string pusher)
        {
            var redis = Global.Require<RedisModule>("redis");
            Channel = pusher;
            client1 = redis.CreateClient(6379, IPs.RedisIP);
        }

        public void Message(string channel, string name, UserModel user, ChannelMessage content)
        {
            var message = new QueueMessage(name, user, content);
            var value = Json.Stringify(message, Help.Sanitize);
            client1.RPush(channel, value); //todo:maybe sanitize
        }

        public void Message(string channel, string name, ChannelMessage content)
        {
            var message = new QueueMessage(name, null, content);
            var value = Json.Stringify(message, Help.Sanitize);
            client1.RPush(channel, value); //todo:maybe sanitize
        }
    }
}