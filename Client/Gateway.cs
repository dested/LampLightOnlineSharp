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
        private JsDictionary<string, Action<ChannelListenTriggerMessage>> channels;
        [IntrinsicProperty]
        protected SocketIOClient GatewaySocket { get; set; }

        public Gateway(string gatewayServer)
        {
            channels = new JsDictionary<string, Action<ChannelListenTriggerMessage>>();
            GatewaySocket = SocketIOClient.Connect(gatewayServer);
            GatewaySocket.On<SocketClientMessageModel>("Client.Message", data => channels[data.Channel](data.Content));
        }

        [IgnoreGenericArguments]
        public void Emit(ChannelListenTriggerMessage content)
        {
            GatewaySocket.Emit("Gateway.Message", new GatewayMessageModel(content.GatewayChannel, content));
        }

        [IgnoreGenericArguments]
        public void On(string channel, Action<ChannelListenTriggerMessage> callback)
        {
            channels[channel] = callback;
        }

        public void Login(string userName)
        {
            GatewaySocket.Emit("Gateway.Login", new UserModel {UserName = userName});
        }
    }
}