using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonAPI;
using CommonLibraries;
using CommonServerLibraries;
using CommonServerLibraries.Queue;
using NodeJSLibrary;
using SocketIOLibrary;
using Http = NodeJS.HttpModule.Http;
namespace MM.GatewayServer
{
    public class GatewayServer
    {
        private string myName;
        private int port;
        private PubSub ps;
        private QueueManager queueManager;
        public JsDictionary<string, GatewayUserModel> users = new JsDictionary<string, GatewayUserModel>();
        [IntrinsicProperty]
        public int Region { get; set; }

        public GatewayServer(int region)
        {
            Region = region;
            var app = Http.CreateServer((req, res) => res.End());

            var io = SocketIO.Listen(app);

            port = 1800 + Math.Truncate((int) ( Math.Random() * 4000 ));

            app.Listen(port);
            io.Set("log level", 1);
            myName = "Gateway " + Guid.NewGuid();

            ps = new PubSub(pubSubReady);

            queueManager = new QueueManager(myName);

            queueManager.AddWatcher(new QueueWatcher("GatewayServer", messageReceived));
            queueManager.AddWatcher(new QueueWatcher(myName, messageReceived));

            queueManager.AddPusher(new QueuePusher("GameServer*"));
            queueManager.AddPusher(new QueuePusher("HeadServer"));

            io.Sockets.On("connection", new Action<SocketIOConnection>(userJoin));
        }

        private static void Main()
        {
            int region = 1;
            new GatewayServer(region);
        }

        private void pubSubReady()
        {
            ps.Subscribe<string>("PUBSUB.GatewayServers.Ping", message => ps.Publish("PUBSUB.GatewayServers", string.Format("http://{0}:{1}", IPs.GatewayIP, port)));
            ps.Publish("PUBSUB.GatewayServers", string.Format("http://{0}:{1}", IPs.GatewayIP, port));
        }

        private void userJoin(SocketIOConnection socket)
        {
            GatewayUserModel user = null;
            socket.On("Gateway.Message",
                      new Action<GatewayMessageModel>((data) => {
                                                          if (user == null) {
                                                              Global.Console.Log("no user found:   " + data.Stringify());
                                                              return;
                                                          }
                                                          var channel = user.GameServer;
                                                          switch (data.Channel) {
                                                              case "Game":
                                                                  channel = user.GameServer;
                                                                  break;
                                                              case "Chat":
                                                                  channel = user.ChatServer ?? "ChatServer";
                                                                  break;
                                                          }
                                                          queueManager.SendMessage(user, channel, data.Content);
                                                      }));

            socket.On("Gateway.Login",
                      new Action<GatewayLoginMessageModel>((data) => {
                                                               user = new GatewayUserModel();
                                                               user.Socket = socket;
                                                               user.UserName = data.UserName;
                                                               user.Gateway = myName;
                                                               users[data.UserName] = user;
                                                               queueManager.SendMessage(user, "GameServer", new PlayerJoinMessage());
                                                           }));
            socket.On("disconnect", new Action<string>((data) => users.Remove(user.UserName)));
        }

        /// <summary>
        ///     the message received from the gameserver
        /// </summary>
        /// <param name="gatewayName">This will either be the gateway's name (gateway94) or just "gateway" meaning it was sent to all gateways and you are the one to pop it from the queue</param>
        /// <param name="channel">the queue channel, generally not needed</param>
        /// <param name="user"></param>
        /// <param name="content"></param>
        private void messageReceived(string gatewayName, UserModel user, ChannelMessage content)
        {
            if (users.ContainsKey(user.UserName)) {
                var u = users[user.UserName];

                if (content.Channel == "GameServer.Accept") {
//if the gamserver has accepted the player, tell him he has joined

                    var message = ( (GameServerAcceptMessage) content );
                    u.GameServer = message.GameServer;

                    SocketClientMessageModel socketClientMessageModel = new SocketClientMessageModel(user, "GameServer.Joined", null);
                    u.Socket.Emit("Client.Message", socketClientMessageModel);
                } else {
//otherwise this is a normal message, just forward it along. 

                    SocketClientMessageModel socketClientMessageModel = new SocketClientMessageModel(user, content.Channel, content);
                    u.Socket.Emit("Client.Message", socketClientMessageModel);
                }
            } else throw new Exception(string.Format("client {0} no found so failure", user.UserName));
        }
    }
}