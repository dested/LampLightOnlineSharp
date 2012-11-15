using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonAPI;
using CommonLibraries;
using SocketIOWebLibrary;
namespace Client
{
    public class Gateway
    {
        private JsDictionary<string, Action<UserModel,ChannelMessage>> channels;
        [IntrinsicProperty]
        protected SocketIOClient GatewaySocket { get; set; }

        public Gateway(string gatewayServer)
        {
            channels = new JsDictionary<string, Action<UserModel, ChannelMessage>>();
            GatewaySocket = SocketIOClient.Connect(gatewayServer);
            GatewaySocket.On<SocketClientMessageModel>("Client.Message", receiveMessage);
        }

        private void receiveMessage(SocketClientMessageModel data)
        {
            channels[data.Channel](data.User,data.Content);
        }

        public void Emit(ChannelMessage content)
        {
            GatewaySocket.Emit("Gateway.Message", new GatewayMessageModel(content.GatewayChannel, content));
        }

        public void On(string channel, Action<UserModel, ChannelMessage> callback)
        {
            channels[channel] = callback;
        }

        public void Login(string userName)
        {
            GatewaySocket.Emit("Gateway.Login", new UserModel {UserName = userName});
        }
    }
}