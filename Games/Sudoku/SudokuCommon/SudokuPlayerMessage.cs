using System;
using System.Runtime.CompilerServices;

namespace SudokuCommon
{
    public class SudokuPlayerMessage
    {
        [IntrinsicProperty]
        public SudokuPlayerMessageType MessageType { get; set; }
        [IntrinsicProperty]
        public object MessageInfo { get; set; }
        
        public T GetMessageInfo<T>()
        {
            return (T) MessageInfo;
        }
    } 
    public enum SudokuPlayerMessageType
    {
        NewNumber
    }

}