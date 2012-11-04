using CommonLibraries;
namespace CommonServerLibraries.Queue
{
    public delegate void QueueCallback(string name, UserModel user, string eventChannel, object content);
}