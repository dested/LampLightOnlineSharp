using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace LampLightOnlineBuild
{
    class Program
    {
        static void Main(string[] args)
        {
            string llo = "LampLightOnlineSharp";

            var projs = new[]
                { 
                    llo+@"\LampLightOnlineClient\",
                    llo+@"\LampLightOnlineServer\",
                };
            var pre = Directory.GetCurrentDirectory() + @"\..\..\..\..\..\";

            foreach (var proj in projs)
            {
#if DEBUG
                var from = pre + proj + @"\bin\debug\" + proj.Split(new[] { "\\" }, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
#else
                var from = pre + proj + @"\bin\release\" + proj.Split(new[] {"\\"}, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
#endif
                var to = pre + llo + @"\output\" + proj.Split(new[] { "\\" }, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
                if (File.Exists(to)) File.Delete(to);
                File.Copy(from, to);
            }

            //client happens in buildsite.cs
            var depends = new Dictionary<string, Application>
                {
                    {
                        llo+@"\LampLightOnlineServer\", new Application(true, "new LampLightOnlineServer.Server();", new List<string>
                            {
                            })
                    } 
                     ,
                    {
                        llo+@"\LampLightOnlineClient\", new Application(false, "", new List<string>
                            {
                            })
                    },
                };
            foreach (var depend in depends)
            {
                var to = pre + llo + @"\output\" + depend.Key.Split(new[] { "\\" }, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
                var output = "";

                if (depend.Value.Node)
                {
                    output += "require('./mscorlib.debug.js');";
                }
                else
                {
                    //output += "require('./mscorlib.debug.js');";
                }

                foreach (var depe in depend.Value.IncludesAfter)
                {
                    output += string.Format("require('{0}');", depe);
                }

                var lines = new List<string>();
                lines.Add(output);
                lines.AddRange(File.ReadAllLines(to));

                lines.Add(depend.Value.After);

                File.WriteAllLines(to, lines);
            }

             

        }
        #region Nested type: Application

        public class Application
        {
            public Application(bool node, string prepend, List<string> includesAfter)
            {
                After = prepend;
                Node = node;
                IncludesAfter = includesAfter;
            }

            public string After { get; set; }
            public bool Node { get; set; }
            public List<string> IncludesAfter { get; set; }
        }

        #endregion

    }
}
