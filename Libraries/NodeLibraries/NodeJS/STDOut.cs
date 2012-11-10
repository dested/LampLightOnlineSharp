using System.Runtime.CompilerServices;
namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class STDOut : EventEmitter
    {
        [ScriptName("write")]
        public void Write(string question) {}
    }
}