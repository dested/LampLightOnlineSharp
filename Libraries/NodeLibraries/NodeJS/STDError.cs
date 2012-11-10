using System.Runtime.CompilerServices;
namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [ScriptName("STDErr")]
    public class STDError : EventEmitter
    {
        [ScriptName("write")]
        public void Write(string question) {}
    }
}