using System.Runtime.CompilerServices;

namespace SudokuCommon
{
    public class SudokuServerMessage
    {
        [IntrinsicProperty]
        public SudokuServerMessageType MessageType { get; set; }
        [IntrinsicProperty]
        public object MessageInfo { get; set; }

        public T GetMessageInfo<T>()
        {
            return (T)MessageInfo;
        }

        public SudokuServerMessage(SudokuServerUpdateNumber messageInfo)
        {
            MessageInfo = messageInfo;
            MessageType = SudokuServerMessageType.UpdateNumber;
        }
    }
}