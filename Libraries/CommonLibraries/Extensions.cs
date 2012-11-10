using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Serialization;
namespace CommonLibraries
{
    public static class Extensions
    {
        public static string Stringify(this object m)
        {
            return Json.Stringify(m);
        }

        [InlineCode("debugger")]
        public static void Debugger() {}

        [InlineCode("{o}")]
        public static bool Truthy(this object o)
        {
            return o != null;
        }

        [InlineCode("!{o}")]
        public static bool Falsey(this object o)
        {
            return o == null;
        }

        [InlineCode("{o}")]
        public static dynamic Me(this object o)
        {
            return o;
        }

        [InlineCode("{o}")]
        [IgnoreGenericArguments]
        public static T Me<T>(this object o)
        {
            return default( T );
        }

        [InlineCode("{o}")]
        [IgnoreGenericArguments]
        public static T[] Array<T>(this List<T> o)
        {
            return new T[0];
        }

        /* 
        public static ExtraData<T, T2> WithData<T, T2>(this T item, T2 data)
        {
            return new ExtraData<T, T2>(item, data);
        }
*/

        public static T GetSafe<T>(this T[][] o, int x, int y)
        {
            var m = o[x];
            if (m == default( T[] )) return default( T );
            return o[x][y];
        }

        public static string Percent(this int num)
        {
            return num + "%";
        }

        public static string Percent(this double num)
        {
            return num + "%";
        }

        [InlineCode("{num}")]
        public static T Cast<T>(this object num)
        {
            return default( T );
        }

        public static ExtraData<T, T2> WithData<T, T2>(this T item, T2 data)
        {
            return new ExtraData<T, T2>(item, data);
        }
    }
}