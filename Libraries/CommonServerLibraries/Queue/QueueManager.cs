using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonAPI;
using NodeJSLibrary;
namespace CommonServerLibraries.Queue
{
    public class QueueManager
    {
        public string Name;
        public JsDictionary<string, ChannelListenTrigger> channels; //necessary evil for maintaining sanity//::dynamic okay
        public List<QueuePusher> qp;
        private QueueItemCollection qpCollection;
        public List<QueueWatcher> qw;
        private QueueItemCollection qwCollection;

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

        private void messageReceived(string name, UserModel user, string eventChannel, ChannelListenTriggerMessage content)
        {
            user.Gateway = name;

            if (channels[eventChannel] != null)
                channels[eventChannel](user, content);
        }

        public void SendMessage(UserModel user, string channel, string eventChannel, ChannelListenTriggerMessage content)
        {
            if (qpCollection.GetByChannel(channel) == null) {
                Global.Console.Log(channel + " No Existy");
                return;
            }

            var pusher = ( (QueuePusher) qpCollection.GetByChannel(channel) );

            pusher.Message(channel, Name, user, eventChannel, content);
        }
    }
}