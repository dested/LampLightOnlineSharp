using System.Html;
using System.Runtime.CompilerServices;
using Client.UIManager;
using CommonClientLibraries;
using CommonLibraries;
using CommonWebLibraries;
using OurSonic.UIManager;
using WebLibraries;
using jQueryApi;
namespace Client
{
    public class ClientManager
    {
        private int canvasHeight;
        private int canvasWidth;
        private CanvasInformation gameCanvas;
        private string gameCanvasName = "gameLayer";
        private int gameGoodWidth;
        private GameManager gameManager;
        private Pointer lastMouseMove;
        private CanvasInformation uiCanvas;
        private string uiCanvasName = "uiLayer";
        private int uiGoodWidth;
        [IntrinsicProperty]
        public UIManager.UIManager UIManager { get; set; }

        public ClientManager()
        {
            var elem = Document.GetElementById("loading");
            elem.ParentNode.RemoveChild(elem);

            var stats = new XStats();
            Document.Body.AppendChild(stats.Element);

            gameCanvas = CanvasInformation.Create((CanvasElement) Document.GetElementById(gameCanvasName), 0, 0);
            uiCanvas = CanvasInformation.Create((CanvasElement) Document.GetElementById(uiCanvasName), 0, 0);
            UIManager = new UIManager.UIManager(this);

            gameManager = new GameManager();

            bindInput();
            Window.AddEventListener("resize", e => resizeCanvas());
            jQuery.Document.Resize(e => resizeCanvas());
            resizeCanvas();
            Window.SetInterval(Tick, 1000 / 60);
            Window.SetInterval(GameDraw, 1000 / 60);
            Window.SetInterval(UIDraw, 1000 / 10);

            gameManager.Start(gameCanvas.Context);

        }

        private static void Main()
        {
            jQuery.OnDocumentReady(() => { new ClientManager(); });
        }

        private void Tick()
        {
            gameManager.Tick();
        }

        private void bindInput()
        {
            uiCanvas.DomCanvas.MouseDown(canvasOnClick);
            uiCanvas.DomCanvas.MouseUp(canvasMouseUp);
            uiCanvas.DomCanvas.MouseMove(canvasMouseMove);

            uiCanvas.DomCanvas.Bind("touchstart", canvasOnClick);
            uiCanvas.DomCanvas.Bind("touchend", canvasMouseUp);
            uiCanvas.DomCanvas.Bind("touchmove", canvasMouseMove);

            uiCanvas.DomCanvas.Bind("DOMMouseScroll", handleScroll);
            uiCanvas.DomCanvas.Bind("mousewheel", handleScroll);
            uiCanvas.DomCanvas.Bind("contextmenu", (e) => e.PreventDefault());
            bool dontPress = false;
            Document.AddEventListener("keypress",
                                      e => { dontPress = UIManager.OnKeyDown(e); },
                                      true);

            KeyboardJS.Instance().Bind.Key("e",
                                           () => { },
                                           () => { });
        }

        private void handleScroll(jQueryEvent jQueryEvent)
        {
            jQueryEvent.PreventDefault();

            int j = jQueryEvent.Me().detail ? jQueryEvent.Me().detail * ( -120 ) : jQueryEvent.Me().wheelDelta;

            if (UIManager.OnMouseScroll(jQueryEvent)) return;
        }

        private void canvasMouseMove(jQueryEvent queryEvent)
        {
            queryEvent.PreventDefault();
            Document.Body.Style.Cursor = "default";
            lastMouseMove = CHelp.GetCursorPosition(queryEvent);
            if (UIManager.OnMouseMove(lastMouseMove)) return;
            if (gameManager.MouseMove(queryEvent)) return;

            return;
        }

        private void canvasOnClick(jQueryEvent queryEvent)
        {
            queryEvent.PreventDefault();
            if (UIManager.OnClick(CHelp.GetCursorPosition(queryEvent))) return;
            if (gameManager.OnClick(queryEvent)) return;
        }

        private void canvasMouseUp(jQueryEvent queryEvent)
        {
            queryEvent.PreventDefault();
            UIManager.OnMouseUp(lastMouseMove);
            if (gameManager.MouseUp(queryEvent)) return;
        }

        public void resizeCanvas()
        {
            canvasWidth = jQuery.Window.GetWidth();
            canvasHeight = jQuery.Window.GetHeight();

            uiCanvas.DomCanvas.Attribute("width", canvasWidth.ToString());
            uiCanvas.DomCanvas.Attribute("height", canvasHeight.ToString());

            gameManager.WindowLocation = new Rectangle(0, 0, Window.InnerWidth, Window.InnerHeight);
            gameCanvas.DomCanvas.Attribute("width", gameManager.WindowLocation.Width.ToString());
            gameCanvas.DomCanvas.Attribute("height", gameManager.WindowLocation.Height.ToString());
            uiGoodWidth = canvasWidth;
            gameGoodWidth = gameManager.WindowLocation.Width;
        }

        public void Clear(CanvasInformation canv)
        {
            int w;
            if (canv == gameCanvas)
                w = gameGoodWidth;
            else
                w = uiGoodWidth;
            canv.DomCanvas[0].Me().width = w;
        }

        public void GameDraw()
        {
            Clear(gameCanvas);
            gameManager.Draw(gameCanvas.Context);
        }

        public void UIDraw()
        {
            Clear(uiCanvas);
            UIManager.Draw(uiCanvas.Context);
        }
    }
}