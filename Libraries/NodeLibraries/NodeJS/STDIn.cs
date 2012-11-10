using System;
using System.Runtime.CompilerServices;
namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class STDIn : EventEmitter
    {
        [ScriptName("resume")]
        public void Resume() {}

        [ScriptName("once")]
        public void Once(string data, Action<string> function) {}
    }
}