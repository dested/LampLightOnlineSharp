﻿using System;
using System.Html;
using System.Runtime.CompilerServices;
using System.Serialization;
using CommonClientLibraries;
using CommonClientLibraries.UIManager;
using CommonLibraries;
using CommonWebLibraries;
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
        private Point gameGoodSize;
        private GameManager gameManager;
        public Gateway gateway;
        private Pointer lastMouseMove;
        private CanvasInformation uiCanvas;
        private string uiCanvasName = "uiLayer";
        private Point uiGoodSize;
        [IntrinsicProperty]
        public UIManager UIManager { get; set; }

        public ClientManager(string gatewayServerAddress)
        {
            var elem = Document.GetElementById("loading");
            elem.ParentNode.RemoveChild(elem);

            var stats = new XStats();
            Document.Body.AppendChild(stats.Element);

            gameCanvas = CanvasInformation.Create((CanvasElement) Document.GetElementById(gameCanvasName), 0, 0);
            uiCanvas = CanvasInformation.Create((CanvasElement) Document.GetElementById(uiCanvasName), 0, 0);
            UIManager = new UIManager();
            gateway = new Gateway(gatewayServerAddress);

            gameManager = new GameManager(gateway.On, gateway.Emit);
            gateway.On("Area.Main.Login.Response", (user,data) => {                                        
                Window.Alert(Json.Stringify(data));
                                                   });
            gateway.Login(randomName());

            bindInput();
            Window.AddEventListener("resize", e => resizeCanvas());
            jQuery.Document.Resize(e => resizeCanvas());
            int a = 0;
            //Window.SetInterval(() => {},1000 / 60);
            Window.SetInterval(GameTick, 1000 / 10);
            Window.SetInterval(Tick, 1000 / 60);
            Window.SetInterval(GameDraw, 1000 / 60);
            Window.SetInterval(UIDraw, 1000 / 10);

            gameManager.Start(gameCanvas.Context);
            resizeCanvas();
            gameManager.BuildUI(UIManager);
        }

        private static string randomName()
        {
            var randomName = "";
            var ra = Math.Random() * 10;
            for (var i = 0; i < ra; i++) {
                randomName += String.FromCharCode((char) ( 65 + ( Math.Random() * 26 ) ));
            }
            return randomName;
        }

        private static void Main()
        {
            jQuery.OnDocumentReady(() => { new ClientManager(( (InputElement) Document.GetElementById("gatewayServer") ).Value); });
        }

        private void Tick()
        {
            gameManager.Tick();
        }

        private void GameTick()
        {
            gameManager.GameTick();
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
            if (gameManager.MouseMove(lastMouseMove)) return;

            return;
        }

        private void canvasOnClick(jQueryEvent queryEvent)
        {
            queryEvent.PreventDefault();
            Pointer cursorPosition = CHelp.GetCursorPosition(queryEvent);
            if (UIManager.OnClick(cursorPosition)) return;
            if (gameManager.OnClick(cursorPosition)) return;
        }

        private void canvasMouseUp(jQueryEvent queryEvent)
        {
            queryEvent.PreventDefault();
            UIManager.OnMouseUp(lastMouseMove);
            if (gameManager.MouseUp(lastMouseMove)) return;
        }

        public void resizeCanvas()
        {
            canvasWidth = jQuery.Window.GetWidth();
            canvasHeight = jQuery.Window.GetHeight();

            uiCanvas.DomCanvas.Attribute("width", canvasWidth.ToString());
            uiCanvas.DomCanvas.Attribute("height", canvasHeight.ToString());

            gameManager.Screen.Width = Window.InnerWidth;
            gameManager.Screen.Height = Window.InnerHeight;
            gameCanvas.DomCanvas.Attribute("width", gameManager.Screen.Width.ToString());
            gameCanvas.DomCanvas.Attribute("height", gameManager.Screen.Height.ToString());
            uiGoodSize = new Point(canvasWidth, canvasHeight);
            gameGoodSize = new Point(gameManager.Screen.Width, gameManager.Screen.Height);
        }

        public void Clear(CanvasInformation canv)
        {
            Point w;
            if (canv == gameCanvas)
                w = gameGoodSize;
            else
                w = uiGoodSize;
            //canv.DomCanvas[0].Me().width = w.width;

            canv.Context.ClearRect(0, 0, w.X, w.Y);
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