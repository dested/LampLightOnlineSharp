using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using ClientAPI;
using CommonAPI;
using CommonLibraries;
using TowerD.Client;
using jQueryApi;
namespace Client
{
    internal class GameManager
    {
        private LampClient game;
        public Rectangle WindowLocation { get; set; }

        public GameManager()
        {
            game = new Game();
        }

        public bool MouseMove(jQueryEvent queryEvent)
        {
            return game.MouseMove(queryEvent);
        }

        public bool OnClick(jQueryEvent queryEvent)
        {
            return game.OnClick(queryEvent);

        }

        public bool MouseUp(jQueryEvent queryEvent)
        {
            return game.MouseUp(queryEvent);

        }

        public void Draw(CanvasContext2D context)
        {
            game.Draw(context);

        }

        public void Tick()
        {
            game.WindowLocation = WindowLocation;
            game.Tick();
        }

        public void Start(CanvasContext2D context)
        {
            game.Init(new LampPlayer[0], context);
        }
    }


}