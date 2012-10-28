using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonAPI;
using CommonLibraries;
using jQueryApi;
namespace ClientAPI
{
    public class LampClient
    {
        [IntrinsicProperty]
        public Rectangle WindowLocation { get; set; }
        public virtual void Init(LampPlayer[] players, CanvasContext2D context) { }

        public virtual bool MouseMove(jQueryEvent jQueryEvent)
        {
            return false;
        }
        public virtual bool BuildUI(UIManager manager)
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