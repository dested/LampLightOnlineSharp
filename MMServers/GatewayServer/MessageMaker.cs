using System;
namespace Messages
{
    public static class MessageMaker
    {
        private const string delimeter = ".";

        public static string Make(params Enum[] m)
        {
            string sb = "";
            foreach (var @enum in m) {
                sb += @enum + delimeter;
            }
            return sb;
        }
    }
}