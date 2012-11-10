using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonLibraries;
using jQueryApi;
namespace CommonClientLibraries
{
    public class CanvasInformation
    {
        private static CanvasElement blackPixel;
        [IntrinsicProperty]
        public CanvasContext2D Context { get; set; }
        [IntrinsicProperty]
        public jQueryObject DomCanvas { get; set; }
        [IntrinsicProperty]
        public CanvasElement Canvas { get; set; }
        public static CanvasElement BlackPixel
        {
            get
            {
                if (blackPixel == null) {
                    var m = Create(0, 0);

                    m.Context.FillStyle = "black";
                    m.Context.FillRect(0, 0, 1, 1);

                    blackPixel = m.Canvas;
                }
                return blackPixel;
            }
        }
        [IntrinsicProperty]
        public ImageElement Image { get; set; }
        [IntrinsicProperty]
        public bool ImageReady { get; set; }

        public CanvasInformation(CanvasContext2D context, jQueryObject domCanvas)
        {
            Context = context;
            DomCanvas = domCanvas;
            Canvas = (CanvasElement) domCanvas[0];
        }

        public static CanvasInformation Create(int w, int h)
        {
            CanvasElement canvas = (CanvasElement) Document.CreateElement("canvas");
            return Create(canvas, w, h);
        }

        public static CanvasInformation Create(CanvasElement canvas, int w, int h)
        {
            if (w == 0) w = 1;
            if (h == 0) h = 1;
            canvas.Width = w;
            canvas.Height = h;

            var ctx = (CanvasContext2D) canvas.GetContext("2d");
            return new CanvasInformation(ctx, jQuery.FromElement(canvas));
        }

        public void Ready()
        {
            return;
            ImageElement image = new ImageElement();
            image.AddEventListener("load",
                                   e => {
                                       Image = image;
                                       ImageReady = true;
                                   },
                                   false);
            image.Src = Canvas.Me().toDataURL();
        }

        public static CanvasInformation Create(ImageElement tileImage)
        {
            var item = Create(tileImage.Width, tileImage.Height);

            item.Context.DrawImage(tileImage, 0, 0);

            return item;
        }

        public static CanvasInformation Create(ImageData imageData)
        {
            var item = Create(imageData.Width, imageData.Height);
            item.Context.PutImageData(imageData, 0, 0);

            return item;
        }
    }
}