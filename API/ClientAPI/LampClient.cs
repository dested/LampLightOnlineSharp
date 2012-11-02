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
        public Rectangle Screen { get; set; }
        public virtual void Init(LampPlayer[] players, CanvasContext2D context) {}

        public virtual bool MouseMove(Pointer jQueryEvent)
        {
            return false;
        }

        public virtual bool MouseScroll(Pointer jQueryEvent)
        {
            return false;
        }

        public virtual void BuildUI(UIManager manager) {}
        public virtual void BindKeys(KeyboardJS manager) {}

        public virtual bool OnClick(Pointer jQueryEvent)
        {
            return false;
        }

        public virtual bool MouseUp(Pointer jQueryEvent)
        {
            return false;
        }
        public virtual void Resize()
        { 
        }

        public virtual void Draw(CanvasContext2D context) {}
        public virtual void Tick() {}
    }
}