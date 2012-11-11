using System.Collections.Generic;
using CommonLibraries;
namespace CommonServerLibraries.Queue
{
    public class QueueItemCollection
    {
        private readonly List<QueueItem> queueItems;

        public QueueItemCollection()
        {
            this.queueItems = new List<QueueItem>();
        }

        /// <summary>
        /// Returns the QueueItem for that channel
        /// </summary>
        /// <param name="channel">Can be the name of a channel or name* if applicable </param>
        /// <returns></returns>
        public QueueItem GetByChannel(string channel)
        {
            foreach (var queueWatcher in queueItems) {
                if (queueWatcher.Channel == channel || channel.IndexOf(queueWatcher.Channel.Replace("*", "")) == 0)
                    return queueWatcher;
            }
            return null;
        }

        public void AddItem(QueueItem item)
        {
            queueItems.Add(item);
        }
    }
}