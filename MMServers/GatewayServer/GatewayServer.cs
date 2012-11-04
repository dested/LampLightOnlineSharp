using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
using CommonServerLibraries;
using CommonServerLibraries.Queue;
using Messages;
using NodeJS.HttpModule;
using SocketIOLibrary;
namespace MM.GatewayServer
{
    public class GatewayServer
    {
        private static void Main()
        {
            new GatewayServer();
        }

        private PubSub ps;
        public JsDictionary<string, UserModel> users = new JsDictionary<string, UserModel>();

        public GatewayServer()
        {
            var app = Http.CreateServer((req, res) => res.End());

            var io = SocketIO.Listen(app); 

            QueueManager queueManager; 


            var port = 1800 + Math.Truncate((int) ( Math.Random() * 4000 ));

            app.Listen(port);
            io.Set("log level", 1);
            var myName = "Gateway " + Guid.NewGuid();

            ps = new PubSub(() =>
            {
                ps.Subscribe<string>("PUBSUB.GatewayServers.Ping", message => ps.Publish("PUBSUB.GatewayServers", string.Format("http://{0}:{1}", IPs.GatewayIP, port)));
                ps.Publish("PUBSUB.GatewayServers", string.Format("http://{0}:{1}", IPs.GatewayIP, port));
            });

            queueManager = new QueueManager(myName,
                                            new QueueManagerOptions(new[]
                                                {
                                                    new QueueWatcher("GatewayServer", messageReceived),
                                                    new QueueWatcher(myName, messageReceived)
                                                },
                                                                    new[]
                                                                        {
                                                                            "GameServer*",
                                                                            "ChatServer",
                                                                            "HeadServer"
                                                                        }));

            io.Sockets.On("connection",new Action<SocketIOConnection>((socket) => {
                              UserModel user = null;
                              socket.On("Gateway.Message", new Action<GatewayMessageModel>((GatewayMessageModel data) =>
                                                                 {
                                                                     var channel = "Bad";
                                                                     switch (data.Channel.Split('.')[1])
                                                                     {
                                                                         case "Game":
                                                                             channel = "GameServer";
                                                                             break; 
                                                                         case "Chat":
                                                                             channel = "ChatServer";
                                                                             break;
                                                                     }
                                                                     queueManager.SendMessage(user, data.GameServer ?? channel, data.Channel, data.Content);
                                                                 }));

                              socket.On("Gateway.Login", new Action<GatewayLoginMessageModel>(( data) =>
                                                               {
                                                                   user = new UserModel();
                                                                   user.Socket = socket;
                                                                   user.UserName = data.UserName;
                                                                   users[data.UserName] = user;
                                                               }));
                              socket.On("disconnect", new Action<string>(( data) => users.Remove(user.UserName)));
                          }));
        }

        private void messageReceived(string gateway, UserModel user, string eventChannel, object content)
        {
            if (users.ContainsKey(user.UserName)) {
                var u = users[user.UserName];
                u.Socket.Emit("Client.Message", new SocketClientMessageModel(user, eventChannel, content));
            }
        }
    }
    }
namespace Messages
{
    public static class MessageMaker
    {
        private const string delimeter = ".";
        public static string Make( params Enum[] m)
        {
            string sb = "";
            foreach (var @enum in m)
            {
                sb += @enum + delimeter;
            }
            return sb;
        } 
    }
    [NamedValues]
    public enum TopLevelMessageType
    {
        Gateway, GameServer
    }
    [NamedValues]
    public enum GatewayMessageType
    {
        Message,Login,
    }

}