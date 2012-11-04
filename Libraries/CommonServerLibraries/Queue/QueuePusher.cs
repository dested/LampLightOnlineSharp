using System.Serialization;
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

        public void Message<T>(string channel, string name, UserModel user, string eventChannel, T content)
        {
            var message = new QueueMessage<T>(name, user, eventChannel, content);
            var value = Json.Stringify(message, Help.Sanitize);
            client1.RPush(channel, value); //todo:maybe sanitize
        }
    }
}