using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonAPI;
using CommonClientLibraries.UIManager;
using CommonLibraries;
using WebLibraries;
using jQueryApi;
namespace ClientAPI
{
    public class LampClient
    {
        [IntrinsicProperty]
        public Rectangle WindowLocation { get; set; }
        public virtual void Init(LampPlayer[] players, CanvasContext2D context) {}

        public virtual bool MouseMove(jQueryEvent jQueryEvent)
        {
            return false;
        }

        

        public virtual void BuildUI(UIManager manager) {}


        public virtual void BindKeys(KeyboardJS manager) {}

        public virtual bool OnClick(jQueryEvent jQueryEvent)
        {
            return false;
        }

        public virtual bool MouseUp(jQueryEvent jQueryEvent)
        {
            return false;
        }

        public virtual void Draw(CanvasContext2D context) {}
        public virtual void Tick() {}
    }
}