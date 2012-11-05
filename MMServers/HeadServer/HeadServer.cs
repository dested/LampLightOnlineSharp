using System;
using System.Collections;
using System.Collections.Generic;
using CommonServerLibraries.Queue;
using NodeJS;
using NodeJS.BufferModule;
using NodeJS.FSModule;
using NodeJS.HttpModule;
namespace MM.HeadServer
{
    public class HeadServer
    {
        private string __dirname = "/usr/local/src/lamp/";
        private List<string> gateways = new List<string>();
        private List<string> indexForSites = new List<string>();
        private string indexPageData;
        private List<string> oldGateways = new List<string>();
        private List<string> oldIndex = new List<string>();
        private PubSub pubsub;
        private QueueManager qManager;
        private int siteIndex;

        public HeadServer()
        { 

            qManager = new QueueManager("Head1", new QueueManagerOptions(new[]
                {
                    new QueueWatcher("HeadServer", null),
                    new QueueWatcher("Head1", null),
                }, new[]
                    {
                        "GatewayServer"
                    }));


            FS.ReadFile(__dirname + "/index.html", ready);

            pubsub = new PubSub(() => pubsub.Subscribe<string>("PUBSUB.GatewayServers", message =>
            {
                indexForSites.Add(indexPageData.Replace("{{gateway}}", message));
                gateways.Add(message);
            }));

            Http.CreateServer(handlerWS).Listen(8844); 

            Globals.SetInterval(pollGateways, 1000);
            pollGateways();
        }

        private void pollGateways()
        {
            pubsub.Publish("PUBSUB.GatewayServers.Ping", "");

            if (indexForSites.Count > 0)
            {
                oldIndex = indexForSites;
            }
            if (gateways.Count > 0)
            {
                oldGateways = gateways;
            }
            indexForSites = new List<string>();
            gateways = new List<string>();
            siteIndex = 0;
        }

        private void handlerWS(ServerRequest request, ServerResponse response)
        {
            if (oldGateways.Count > 0)
            {
                var inj = (siteIndex++) % oldIndex.Count;
                response.End(oldGateways[inj]);
                return;
            }
            response.End();
        }

        private void handler(ServerRequest request, ServerResponse response)
        {
            var dict = new JsDictionary<string,string>();
            dict["Content-Type"] = "text/html";
            dict["Access-Control-Allow-Origin"] = "*";
            if (oldIndex.Count > 0)
            {
                response.WriteHead(200, dict);
                var inj = (siteIndex++) % oldIndex.Count;
                response.End(oldIndex[inj]);
            }
            else
            {
                response.WriteHead(200, dict);
                response.End();
            }
        }

        public void ready(Error error, Buffer content)
        {
            indexPageData = content.ToString();
            Http.CreateServer(handler).Listen(80);
        }

        private static void Main()
        {
            new HeadServer();
        }
    }
}