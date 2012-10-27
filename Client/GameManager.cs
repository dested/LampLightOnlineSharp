using System.Html.Media.Graphics;
using ClientAPI;
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
            return false;
        }

        public bool OnClick(jQueryEvent queryEvent)
        {
            return false;
        }

        public bool MouseUp(jQueryEvent queryEvent)
        {
            return false;
        }

        public void Draw(CanvasContext2D context) {}
        public void Tick() {}
    }
}