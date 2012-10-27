using System;
using System.Collections.Generic;
using CommonLibraries;
using CommonShuffleLibrary;
using Models;
using NodeJS.HttpModule;
using SocketIOLibrary;
namespace GatewayServer
{
    public class GatewayServer
    {
        public JsDictionary<string, UserModel> users = new JsDictionary<string, UserModel>();

        public GatewayServer()
        {
            var app = Http.CreateServer((req, res) => res.End());

            var io = SocketIO.Listen(app);
            var port = 1800 + Math.Truncate((int) ( Math.Random() * 4000 ));

            app.Listen(port);
            io.Set("log level", 1);
            var myName = "Gateway " + Guid.NewGuid();

            io.Sockets.On("connection",
                          new Action<SocketIOConnection>((socket) => {
                                                             UserModel user = null;
                                                             socket.On("Gateway.Message", new Action<GatewayMessageModel>(data => { }));

                                                             socket.On("Gateway.Login",
                                                                       new Action<GatewayLoginMessageModel>((data) => {
                                                                                                                user = new UserModel();
                                                                                                                user.Socket = socket;
                                                                                                                user.UserName = data.UserName;
                                                                                                                users[data.UserName] = user;
                                                                                                            }));
                                                             socket.On("disconnect", new Action<string>((string data) => users.Remove(user.UserName)));
                                                         }));
        }

        private static void Main()
        {
            new GatewayServer();
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