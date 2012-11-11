namespace CommonServerLibraries.Queue
{
    public class QueueManagerOptions
    {
        public string[] Pushers;
        public QueueWatcher[] Watchers;

        public QueueManagerOptions(QueueWatcher[] watchers, string[] pushers)
        {
            Watchers = watchers;
            Pushers = pushers;
        }
    }
}