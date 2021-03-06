using System;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonAPI;
using CommonClientLibraries.UIManager;
using CommonLibraries;
using WebLibraries;
namespace ClientAPI
{
    public class LampClient
    {
        [IntrinsicProperty]
        public Action<string, Action<UserModel, ChannelMessage>> ReceiveChannelMessage { get; set; }
        [IntrinsicProperty]
        public Action<ChannelMessage> SendChannelMessage { get; set; }
        [IntrinsicProperty]
        public Rectangle Screen { get; set; }
        public LampPlayer[] Players { get; set; }

        public virtual void Init(LampPlayer[] players, CanvasContext2D context)
        {
            Players = players;
        }

        public virtual bool MouseMove(Pointer pointer)
        {
            return false;
        }

        public virtual bool MouseScroll(Pointer pointer)
        {
            return false;
        }

        public virtual void BuildUI(UIManager manager) {}
        public virtual void BindKeys(KeyboardJS manager) {}

        public virtual bool OnClick(Pointer pointer)
        {
            return false;
        }

        public virtual bool MouseUp(Pointer pointer)
        {
            return false;
        }

        public virtual void Resize() {}
        public virtual void Draw(CanvasContext2D context) {}
        public virtual void Tick() {}
        public virtual void GameTick() {}
    }
}