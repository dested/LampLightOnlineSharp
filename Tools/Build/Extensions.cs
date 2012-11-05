using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Build
{
   public static class Extensions
    {
       public static IEnumerable<T> After<T>(this IEnumerable<T> items, int index)
       {
           int ind = 0;
           return items.Where(item => ind++>=index);
       }
    }
}
