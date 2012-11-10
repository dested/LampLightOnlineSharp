using System.Runtime.CompilerServices;
using MongoDB;
using NodeJSLibrary;
namespace GameServer
{
    public class DataManager
    {
        private MongoConnection Connection;
        public DataManagerGameData GameData;
        private MongoServer Server;
        public MongoDB.MongoDB client;

        public DataManager()
        {
            GameData = new DataManagerGameData(this);
            var mongo = Global.Require<MongoModule>("mongodb");

            var Db = mongo.DB;
            Connection = mongo.Connection;
            var server = Server = mongo.Server;

            client = getMongo();
            client.Open((arg1, arg2) => {
                            //client.Collection("test_insert", "test");
                        });
        }

        [InlineCode("new Db('test', new server('50.116.28.16', 27017, {}))")]
        private MongoDB.MongoDB getMongo()
        {
            return null;
        }
    }
}