using System.Runtime.CompilerServices;
using MongoDB;
using NodeJSLibrary;
namespace CommonServerLibraries
{
    public class DataManager
    {
        private MongoConnection Connection;
        private MongoServer Server;
        public MongoDB.MongoDB client;

        public DataManager()
        {
            var mongo = Global.Require<MongoModule>("mongodb");

            var Db = mongo.DB;
            Connection = mongo.Connection;
            var server = Server = mongo.Server;

            client = getMongo();
            client.Open((arg1, arg2) => {
                            //client.Collection("test_insert", "test");
                        });
        }

        [InlineCode("new Db('test', new server('50.116.28.16', 27017, {}) )")]
        private MongoDB.MongoDB getMongo()
        {
            return null;
        }
    }
}