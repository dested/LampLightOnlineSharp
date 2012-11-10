using System;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using ClientAPI;
using CommonAPI;
using CommonClientLibraries.UIManager;
using CommonLibraries;
using WebLibraries;
using ZombieGame.Client;
namespace Client
{
    public class GameManager
    {
        private LampClient game;
        [IntrinsicProperty]
        public Action<string, Action<ChannelListenTriggerMessage>> ReceiveChannelMessage { get; set; }
        [IntrinsicProperty]
        public Action<string, ChannelListenTriggerMessage> SendChannelMessage { get; set; }
        [IntrinsicProperty]
        public Rectangle Screen { get; set; }

        public GameManager(Action<string, Action<ChannelListenTriggerMessage>> receiveChannelMessage, Action<string, ChannelListenTriggerMessage> sendChannelMessage)
        {
            ReceiveChannelMessage = receiveChannelMessage;
            SendChannelMessage = sendChannelMessage;
            //  game = new TowerD.Client.Game();
            game = new Game();
            game.ReceiveChannelMessage = ReceiveChannelMessage;
            game.SendChannelMessage = SendChannelMessage;
            // game = new ZakGame.Client.Game();
            Screen = new Rectangle(0, 0, 0, 0);
        }

        public bool MouseMove(Pointer queryEvent)
        {
            return game.MouseMove(queryEvent);
        }

        public void BuildUI(UIManager uiManager)
        {
            game.BuildUI(uiManager);
        }

        public bool OnClick(Pointer queryEvent)
        {
            return game.OnClick(queryEvent);
        }

        public bool MouseUp(Pointer queryEvent)
        {
            return game.MouseUp(queryEvent);
        }

        public void Draw(CanvasContext2D context)
        {
            game.Draw(context);
        }

        public void Tick()
        {
            game.Tick();
        }

        public void Start(CanvasContext2D context)
        {
            game.Screen = Screen;
            game.Init(new LampPlayer[0], context);
            game.BindKeys(KeyboardJS.Instance());
        }
    }
}