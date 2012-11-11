using System.Collections.Generic;
namespace CommonServerLibraries.Queue
{
    public class QueueItemCollection
    {
        private readonly IEnumerable<QueueItem> queueItems;

        public QueueItemCollection(IEnumerable<QueueItem> queueItems)
        {
            this.queueItems = queueItems;
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
    }
}