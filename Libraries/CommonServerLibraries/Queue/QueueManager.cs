using System.Collections.Generic;
using CommonAPI;
using NodeJSLibrary;
namespace CommonServerLibraries.Queue
{
    public class QueueManager
    {
        private readonly JsDictionary<string, ChannelListenTrigger> channels;
        private readonly QueueItemCollection qpCollection;
        private readonly QueueItemCollection qwCollection;
        public string Name { get; set; }

        public QueueManager(string name)
        {
            Name = name;
            channels = new JsDictionary<string, ChannelListenTrigger>();
            qwCollection = new QueueItemCollection();
            qpCollection = new QueueItemCollection();
        }

        public void AddChannel(string channel, ChannelListenTrigger callback)
        {
            channels[channel] = callback;
        }

        private void messageReceived(string name, UserModel user, ChannelMessage message)
        {
            user.Gateway = name;

            if (channels[message.Channel] != null)
                channels[message.Channel](user, message);
        }

        public void SendMessage(UserModel user, string channel, ChannelMessage message)
        {
            var pusher = (QueuePusher) qpCollection.GetByChannel(channel);

            if (pusher == null) {
                Global.Console.Log(channel + " No Existy");
                return;
            }

            pusher.Message(channel, Name, user, message);
        }

        public void SendMessage(string channel, ChannelMessage message)
        {
            var pusher = (QueuePusher) qpCollection.GetByChannel(channel);

            if (pusher == null) {
                Global.Console.Log(channel + " No Existy");
                return;
            }

            pusher.Message(channel, Name, message);
        }

        public void AddWatcher(QueueWatcher queueWatcher)
        {
            if (queueWatcher.Callback == null)
                queueWatcher.Callback = messageReceived;
            qwCollection.AddItem(queueWatcher);
        }

        public void AddPusher(QueuePusher queuePusher)
        {
            qpCollection.AddItem(queuePusher);
        }
    }
}