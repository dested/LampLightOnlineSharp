using System;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonLibraries;
using jQueryApi;
namespace CommonClientLibraries.UIManager
{
    public class Button<T> : Button
    {
        [IntrinsicProperty]
        public T Data { get; set; }

        public Button(T data, int x, int y, int width, int height, DelegateOrValue<string> text) : base(x, y, width, height, text)
        {
            Data = data;
        }
    }
    public class Button : Element
    {
        [IntrinsicProperty]
        public string Font { get; set; }
        [IntrinsicProperty]
        public bool Toggle { get; set; }
        [IntrinsicProperty]
        public bool Toggled { get; set; }
        [IntrinsicProperty]
        private bool Clicking { get; set; }
        [IntrinsicProperty]
        private Gradient Button2Grad { get; set; }
        [IntrinsicProperty]
        public Gradient Button1Grad { get; set; }
        [IntrinsicProperty]
        private Gradient ButtonBorderGrad { get; set; }
        [IntrinsicProperty]
        public DelegateOrValue<string> Text { get; set; }
        [IntrinsicProperty]
        public string Color { get; set; }

        public Button(int x, int y, int width, int height, DelegateOrValue<string> text)
                : base(x, y)
        {
            Text = text;
            Toggle = false;
            Toggled = false;
            Font = UIManager.ButtonFont;
            Clicking = false;
            Button1Grad = null;
            Button2Grad = null;
            ButtonBorderGrad = null;
            Width = width;
            Height = height;
        }

        public override void Construct()
        {
            base.Construct();

            var canv = CanvasInformation.Create(1, 1).Context;

            Button1Grad = canv.CreateLinearGradient(0, 0, 0, 1);

            Button1Grad.AddColorStop(0, "#FFFFFF");
            Button1Grad.AddColorStop(1, "#A5A5A5");

            Button2Grad = canv.CreateLinearGradient(0, 0, 0, 1);
            Button2Grad.AddColorStop(0, "#A5A5A5");
            Button2Grad.AddColorStop(1, "#FFFFFF");

            ButtonBorderGrad = canv.CreateLinearGradient(0, 0, 0, 1);
            ButtonBorderGrad.AddColorStop(0, "#AFAFAF");
            ButtonBorderGrad.AddColorStop(1, "#7a7a7a");
        }

        public override bool OnClick(Pointer e)
        {
            if (!Visible)
                return false;
            Clicking = true;
            if (Toggle)
                Toggled = !Toggled;

            return base.OnClick(e);
        }

        public override bool OnMouseUp(Pointer e)
        {
            if (!Visible)
                return false;
            if (Clicking) {
                if (Click != null)
                    Click(new Point(e.X, e.Y));
            }
            Clicking = false;
            if (MouseUp != null)
                MouseUp(new Point(e.X, e.Y));

            return base.OnMouseUp(e);
        }

        public override bool OnMouseOver(Pointer e)
        {
            if (!Visible) return false;
            if (MouseOver != null)
                MouseOver(new Point(e.X, e.Y));
            return base.OnMouseOver(e);
        }

        public override void Draw(CanvasContext2D canv)
        {
            if (!Visible) return;

            canv.Save();

            canv.StrokeStyle = ButtonBorderGrad;
            if (Toggle) {
                canv.FillStyle = ( Toggled
                                           ? Button1Grad
                                           : Button2Grad );
            } else {
                canv.FillStyle = ( Clicking
                                           ? Button1Grad
                                           : Button2Grad );
            }
            canv.LineWidth = 2;
            CHelp.RoundRect(canv, TotalX, TotalY, Width, Height, 2, true, true);
            if (canv.Font != Font)
                canv.Font = Font;
            canv.FillStyle = "#000000";
            string txt = Text;

            canv.FillText(txt,
                          TotalX + ( ( Width / 2 ) - ( canv.MeasureText(txt).Width / 2 ) ),
                          TotalY + ( Height / 3 ) * 2);

            canv.Restore();
        }
    }
    public class CHelp
    {
        public static void RoundRect(CanvasContext2D ctx, int x, int y, int width, int height, int radius = 5, bool fill = true, bool stroke = false)
        {
            ctx.Save();
            ctx.LineWidth = 3;
            ctx.BeginPath();
            ctx.MoveTo(x + radius, y);
            ctx.LineTo(x + width, y);
            //ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.LineTo(x + width, y + height);
            // ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.LineTo(x, y + height);
            // ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.LineTo(x, y + radius);
            ctx.QuadraticCurveTo(x, y, x + radius, y);
            ctx.ClosePath();
            if (stroke)
                ctx.Stroke();
            if (fill)
                ctx.Fill();
            ctx.Restore();
        }

        public static Pointer GetCursorPosition(jQueryEvent ev)
        {
            if (ev.Me().originalEvent && ev.Me().originalEvent.targetTouches && ev.Me().originalEvent.targetTouches.length > 0) ev = ev.Me().originalEvent.targetTouches[0];

            if (ev.PageX.Me() != null && ev.PageY.Me() != null)
                return new Pointer(ev.PageX, ev.PageY, 0, ev.Which == 3);
            //if (ev.x != null && ev.y != null) return new { x: ev.x, y: ev.y };
            return new Pointer(ev.ClientX, ev.ClientY, 0, ev.Which == 3);
        }

        public static void LoadImageFromFile(string tileMapFile, Action<ImageElement> loaded)
        {
            ImageElement element = new ImageElement();
            element.AddEventListener("load", e => { loaded(element); }, false);
            element.Src = tileMapFile;

        }
    }
}