using System.Html.Media.Graphics;
using CommonAPI;
using jQueryApi;
namespace ClientAPI
{
    public class LampClient
    {
        public virtual void Init(LampPlayer[] players, CanvasContext2D context) { }

        public virtual bool MouseMove(jQueryEvent jQueryEvent)
        {
            return false;
        }
        public virtual bool OnClick(jQueryEvent jQueryEvent)
        {
            return false;
        }
        public virtual bool MouseUp(jQueryEvent jQueryEvent)
        {
            return false;
        }

        public virtual void Draw(CanvasContext2D context)
        {
        

        }

        public virtual void Tick()
        {
        }
    }
}