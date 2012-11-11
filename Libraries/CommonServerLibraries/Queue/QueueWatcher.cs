using System.Serialization;
using CommonAPI;
using NodeJSLibrary;
using Redis;
namespace CommonServerLibraries.Queue
{
    public class QueueWatcher : QueueItem //todo generisize
    {
        private RedisClient client1;
        public QueueCallback Callback { get; set; }

        public QueueWatcher(string queue, QueueCallback callback)
        {
            Channel = queue;
            Callback = callback;

            var redis = Global.Require<RedisModule>("redis");

            client1 = redis.CreateClient(6379, IPs.RedisIP);

            Cycle(queue);
        }

        public void Cycle(string channel)
        {
            client1.BLPop(new object[] {channel, 0},
                          (caller, dtj) => {
                              var data = (string[]) dtj;
                              if (dtj != null) {
                                  var dt = Json.Parse<QueueMessage>(data[1]);
                                  Callback(dt.Name, channel,dt.User, dt.Content);
                              }
                              Cycle(channel);
                          });
        }
    }
    //http://www.youtube.com/watch?v=tOu-LTsk1WI*/
}