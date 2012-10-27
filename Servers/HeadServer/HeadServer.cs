using System.Collections.Generic;
namespace HeadServer
{
    public class HeadServer
    {
        private string __dirname = "/usr/local/src/lamp";
        private List<string> gateways = new List<string>();
        private List<string> indexForSites = new List<string>();
        private string indexPageData;
        private List<string> oldGateways = new List<string>();
        private List<string> oldIndex = new List<string>();
        private int siteIndex;
        public HeadServer() {}

        private static void Main()
        {
            new HeadServer();
        }
    }
}