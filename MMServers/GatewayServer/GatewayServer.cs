using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonAPI;
using CommonLibraries;
using CommonServerLibraries;
using CommonServerLibraries.Queue;
using NodeJSLibrary;
using SocketIOLibrary;
using ZombieGame.Common;
using Http = NodeJS.HttpModule.Http;
namespace MM.GatewayServer
{
    public class GatewayServer
    {
        private PubSub ps;
        public JsDictionary<string, GatewayUserModel> users = new JsDictionary<string, GatewayUserModel>();
        [IntrinsicProperty]
        public int Region { get; set; }

        public GatewayServer(int region)
        {
            Region = region;
            var app = Http.CreateServer((req, res) => res.End());

            var io = SocketIO.Listen(app);

            QueueManager queueManager;

            var port = 1800 + Math.Truncate((int) ( Math.Random() * 4000 ));

            app.Listen(port);
            io.Set("log level", 1);
            var myName = "Gateway " + Guid.NewGuid();

            ps = new PubSub(() => {
                                ps.Subscribe<string>("PUBSUB.GatewayServers.Ping", message => ps.Publish("PUBSUB.GatewayServers", string.Format("http://{0}:{1}", IPs.GatewayIP, port)));
                                ps.Publish("PUBSUB.GatewayServers", string.Format("http://{0}:{1}", IPs.GatewayIP, port));
                            });

            queueManager = new QueueManager(myName,
                                            new QueueManagerOptions(new[] {
                                                                                  new QueueWatcher("GatewayServer", messageReceived),
                                                                                  new QueueWatcher(myName, messageReceived)
                                                                          },
                                                                    new[] {
                                                                                  "GameServer*",
                                                                                  "ChatServer",
                                                                                  "HeadServer"
                                                                          }));

            io.Sockets.On("connection",
                          new Action<SocketIOConnection>((socket) => {
                                                             GatewayUserModel user = null;
                                                             socket.On("Gateway.Message",
                                                                       new Action<GatewayMessageModel>((data) => {
                                                                                                           if (user == null) {
                                                                                                               Global.Console.Log("no user found:   " + data.Stringify());
                                                                                                               return;
                                                                                                           }
                                                                                                           var channel = "Bad";
                                                                                                           switch (data.Channel.Split('.')[1]) {
                                                                                                               case "Game":
                                                                                                                   channel = user.GameServer;
                                                                                                                   break;
                                                                                                               case "Chat":
                                                                                                                   channel = user.ChatServer ?? "ChatServer";
                                                                                                                   break;
                                                                                                           }
                                                                                                           queueManager.SendMessage(user, channel, data.Channel, data.Content);
                                                                                                       }));

                                                             socket.On("Gateway.Login",
                                                                       new Action<GatewayLoginMessageModel>((data) => {
                                                                                                                user = new GatewayUserModel();
                                                                                                                user.Socket = socket;
                                                                                                                user.UserName = data.UserName;

                                                                                                                users[data.UserName] = user;
                                                                                                                queueManager.SendMessage(user, "GameServer", "Player.Join", new PlayerJoinMessage());

                                                                                                                socket.Emit("Area.Main.Login.Response", "hi! " + data.UserName);
                                                                                                            }));
                                                             socket.On("disconnect", new Action<string>((data) => users.Remove(user.UserName)));
                                                         }));
        }

        private static void Main()
        {
            int region = 1;
            new GatewayServer(region);
        }

        /// <summary>
        ///     the message received from the gameserver
        /// </summary>
        /// <param name="gatewayName">This will either be the gateway's name (gateway94) or just "gateway" meaning it was sent to all gateways and you are the one to pop it from the queue</param>
        /// <param name="user"></param>
        /// <param name="eventChannel">The thing thats happening, "player.shootshit"</param>
        /// <param name="content"></param>
        private void messageReceived(string gatewayName, UserModel user, string eventChannel, ChannelListenTriggerMessage content)
        {
            if (users.ContainsKey(user.UserName)) {
                var u = users[user.UserName];

                if (eventChannel == "GameServer.AcceptPlayer") {
//if the gamserver has accepted the player, tell him he has joined

                    var message = ( (GameServerAcceptMessage) content );
                    u.GameServer = message.GameServer;

                    SocketClientMessageModel socketClientMessageModel = new SocketClientMessageModel(user, "GameServer.Joined", new ChannelListenTriggerMessage());
                    u.Socket.Emit("Client.Message", socketClientMessageModel);
                } else {
//otherwise this is a normal message, just forward it along. 

                    SocketClientMessageModel socketClientMessageModel = new SocketClientMessageModel(user, eventChannel, content);
                    u.Socket.Emit("Client.Message", socketClientMessageModel);
                }
            } else throw new Exception(string.Format("client {0} no found so failure", user.UserName));
        }
    }
}
namespace Messages
{
}