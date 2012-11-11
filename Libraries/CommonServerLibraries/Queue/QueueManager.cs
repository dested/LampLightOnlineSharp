using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonAPI;
using NodeJSLibrary;
namespace CommonServerLibraries.Queue
{
    public class QueueManager
    {
        private readonly JsDictionary<string, ChannelListenTrigger> channels;
        private readonly QueueItemCollection qpCollection;
        private readonly QueueItemCollection qwCollection;
        private readonly List<QueuePusher> qp;
        private readonly List<QueueWatcher> qw;
        public string Name { get; set; }

        public QueueManager(string name, QueueManagerOptions options)
        {
            Name = name;
            channels = new JsDictionary<string, ChannelListenTrigger>();
            qw = new List<QueueWatcher>();
            qp = new List<QueuePusher>();
            foreach (var queueWatcher in options.Watchers) {
                if (queueWatcher.Callback == null)
                    queueWatcher.Callback = messageReceived;
                qw.Add(queueWatcher);
            }
            qw.AddRange(options.Watchers);
            foreach (var pusher in options.Pushers) {
                qp.Add(new QueuePusher(pusher));
            }

            qwCollection = new QueueItemCollection(qw);
            qpCollection = new QueueItemCollection(qp);
        }

        [IgnoreGenericArguments]
        public void AddChannel(string channel, ChannelListenTrigger callback)
        {
            channels[channel] = callback;
        }

        private void messageReceived(string name, string channel, UserModel user, ChannelListenTriggerMessage message)
        {
            user.Gateway = name;

            if (channels[channel] != null)
                channels[channel](user, message);
        }

        public void SendMessage(UserModel user,string channel , ChannelListenTriggerMessage message)
        {
            var pusher = (QueuePusher)qpCollection.GetByChannel(channel);

            if (pusher == null) {
                Global.Console.Log(channel + " No Existy");
                return;
            }

            pusher.Message(channel, Name, user,  message);
        }
    }
}