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
    public class DataManagerGameData
    {
        private DataManager manager;

        public DataManagerGameData(DataManager manager)
        {
            this.manager = manager;
        }

        public void Insert(string gameName, int answerIndex)
        {
            manager.client.Collection("gameInfo",
                                      (err, collection) => {
                                          var gmo = new GameInfoObject();
                                          gmo.GameName = gameName;
                                          gmo.Answer = answerIndex;
                                          collection.Insert(gmo);
                                      });
        }
    }
    public class GameInfoObject //todo:DATABASEMODEL
    {
        public int Answer;
        public string GameName;
    }
}