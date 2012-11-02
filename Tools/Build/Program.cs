#define FTP
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using Limilabs.FTP.Client;
namespace LampLightOnlineBuild
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            string llo = "LampLightOnlineSharp";
            var pre = Directory.GetCurrentDirectory() + @"\..\..\..\..\..\..\";

            /*


            var projs = new[]
                { 
                    llo+@"\LampLightOnlineClient\",
                    llo+@"\LampLightOnlineServer\",
                };

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
*/

            //client happens in buildsite.cs
            var depends = new Dictionary<string, Application> {
                                                                      /*{
                        llo+@"\Servers\AdminServer\", new Application(true, "new AdminServer.AdminServer();", new List<string>
                            {
                                @"./CommonLibraries.js",
                                @"./CommonServerLibraries.js",
                                @"./Models.js",
                            })
                    }*/
                                                                      {
                                                                              "ChatServer", new Application(true,
                                                                                                            "new ChatServer.ChatServer();",
                                                                                                            new List<string> {
                                                                                                                                     @"./CommonLibraries.js",
                                                                                                                                     @"./CommonServerLibraries.js",
                                                                                                                                     @"./Models.js",
                                                                                                                             })
                                                                      }, {
                                                                                 "GameServer", new Application(true,
                                                                                                               "new GameServer.GameServer();",
                                                                                                               new List<string> {
                                                                                                                                        @"./CommonLibraries.js",
                                                                                                                                        @"./CommonServerLibraries.js",
                                                                                                                                        @"./Models.js",
                                                                                                                                        @"./RawDeflate.js",
                                                                                                                                })
                                                                         }, {
                                                                                    "GatewayServer", new Application(true,
                                                                                                                     "new GatewayServer.GatewayServer();",
                                                                                                                     new List<string> {
                                                                                                                                              @"./CommonLibraries.js",
                                                                                                                                              @"./CommonServerLibraries.js",
                                                                                                                                              @"./Models.js",
                                                                                                                                      })
                                                                            }, {
                                                                                       "HeadServer", new Application(true,
                                                                                                                     "new HeadServer.HeadServer();",
                                                                                                                     new List<string> {
                                                                                                                                              @"./CommonLibraries.js",
                                                                                                                                              @"./CommonServerLibraries.js",
                                                                                                                                              @"./Models.js",
                                                                                                                                      })
                                                                               }, {
                                                                                          "SiteServer", new Application(true,
                                                                                                                        "",
                                                                                                                        new List<string> {
                                                                                                                                                 @"./CommonLibraries.js",
                                                                                                                                                 @"./CommonServerLibraries.js",
                                                                                                                                                 @"./Models.js",
                                                                                                                                         })
                                                                                  },
                                                                      {"Client", new Application(false, "", new List<string> {})},
                                                                      {"CommonWebLibraries", new Application(false, "", new List<string> {})},
                                                                      {"CommonLibraries", new Application(false, "", new List<string> {})},
                                                                      {"CommonClientLibraries", new Application(false, "", new List<string> {})},
                                                                      {"ClientAPI", new Application(false, "", new List<string> {})},
                                                                      {"ServerAPI", new Application(false, "", new List<string> {})},
                                                                      {"CommonAPI", new Application(false, "", new List<string> {})},
                                                              };

            string loc = "/httpdocs/zak/";
#if FTP
            Console.WriteLine("connecting ftp");
            Ftp webftp = new Ftp();
            webftp.Connect(ConfigurationSettings.AppSettings["ftpurl"]);
            webftp.Login(ConfigurationSettings.AppSettings["ftpusername"], ConfigurationSettings.AppSettings["ftppassword"]);

            Console.WriteLine("connected");

            webftp.Progress += (e, c) => {
                                   Console.SetCursorPosition(65, 5);
                                   Console.Write("|");

                                   for (int i = 0; i < c.Percentage / 10; i++) {
                                       Console.Write("=");
                                   }
                                   for (int i = (int) ( c.Percentage / 10 ); i < 10; i++) {
                                       Console.Write("-");
                                   }
                                   Console.Write("|");

                                   Console.Write(c.Percentage + "  %  ");
                                   Console.WriteLine();
                               };

#endif

            foreach (var depend in depends) {
                var to = pre + "\\" + llo + @"\output\" + depend.Key + ".js"; /*
                var output = "";

                if (depend.Value.Node)
                    output += "require('./mscorlib.debug.js');";
                else {
                    //output += "require('./mscorlib.debug.js');";
                }

                foreach (var depe in depend.Value.IncludesAfter) {
                    output += string.Format("require('{0}');", depe);
                }

                var lines = new List<string>();
                lines.Add(output);
                lines.AddRange(File.ReadAllLines(to));

                string text = lines.Aggregate("", (a, b) => a + b + "\n");

                //     lines.Add(depend.Value.After);*/

                var name = to.Split(new char[] {'\\'}, StringSplitOptions.RemoveEmptyEntries).Last();
                //   File.WriteAllText(to, text);

#if FTP

                long length = new FileInfo(to).Length;
                if (webftp.GetFileSize(loc + name) != length)
                {
                    Console.WriteLine("ftp start " + length.ToString("N0"));
                    webftp.Upload(loc + name, to);
                    Console.WriteLine("ftp complete " + to);
                }
#endif
            }

            string[] games = { "TowerD", "ZombieGame", "ZakGame" };

            foreach (var depend in games) {
                var to = pre + llo + @"\output\Games\" + depend + @"\";

                string[] exts = {"client", "common", "server"};

                foreach (var ext in exts) {
                    //     lines.Add(depend.Value.After); 
                    string fm = to + depend + "." + ext + ".js";

                    string text = File.ReadAllText(fm);
                    File.WriteAllText(fm, text);

#if FTP
                    Console.WriteLine("ftp start " + text.Length.ToString("N0"));
                    webftp.Upload(loc+"Games/" + depend + "/" + depend + "." + ext + ".js", fm);
                    Console.WriteLine("ftp complete " + fm);
#endif
                }
            }
        }

        #region Nested type: Application

        public class Application
        {
            private string After { get; set; }
            public bool Node { get; set; }
            public List<string> IncludesAfter { get; set; }

            public Application(bool node, string prepend, List<string> includesAfter)
            {
                After = prepend;
                Node = node;
                IncludesAfter = includesAfter;
            }
        }

        #endregion
    }
}