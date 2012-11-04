using System;
using System.Html;
using System.Html.Media.Graphics;
using CommonLibraries;
using jQueryApi;
namespace CommonClientLibraries.UIManager
{
    public static class CHelp
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

        public static void LoadImageFromUrl(string tileMapFile, Action<ImageElement> loaded)
        {
            ImageElement element = new ImageElement();
            element.AddEventListener("load", e => { loaded(element); }, false);
            element.Src = tileMapFile;
        }
    }
}