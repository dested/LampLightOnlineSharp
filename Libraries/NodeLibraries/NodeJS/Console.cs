using System;
using System.Runtime.CompilerServices;
namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [IgnoreGenericArguments]
    public class Console
    {
        public void Log(string log) {}
        public void Log(Exception log) {}
    }
}