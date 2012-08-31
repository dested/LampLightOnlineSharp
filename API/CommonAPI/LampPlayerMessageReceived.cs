using System.Runtime.CompilerServices;

namespace CommonAPI
{
    public class LampPlayerMessageReceived : LampPlayerMessage
    {
        [IntrinsicProperty]
        public object Data { get; set; }


        public T GetData<T>()
        {
            return (T) Data;
        }
    }
}