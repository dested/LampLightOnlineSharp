using System.Runtime.CompilerServices;
using TowerD.Common;
namespace SudokuCommon
{
    public class SudokuServerMessage
    {
        [IntrinsicProperty]
        public SudokuServerMessageType MessageType { get; set; }
        [IntrinsicProperty]
        public object MessageInfo { get; set; }

        public SudokuServerMessage(SudokuServerUpdateNumber messageInfo)
        {
            MessageInfo = messageInfo;
            MessageType = SudokuServerMessageType.UpdateNumber;
        }

        public T GetMessageInfo<T>()
        {
            return (T) MessageInfo;
        }
    }
}