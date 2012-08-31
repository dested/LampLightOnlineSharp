using System.Runtime.CompilerServices;

namespace CommonAPI
{
    public class LampPlayer
    {
        [IntrinsicProperty]
        public LampEvent<LampPlayerMessageReceived> OnMessageRecieved { get; set; }

        [IntrinsicProperty]
        public string PlayerName { get; set; }

        public void SendMessage<T>(T sudokuServerMessage)
        {
        }
    }
}