using System;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using ClientAPI;
using CommonAPI;
using CommonClientLibraries.UIManager;
using CommonLibraries;
using WebLibraries;
using jQueryApi;
namespace ZombieGame.Client
{
    public class Game : LampClient
    {
        public static bool DRAWFAST;
        public static Game Instance;
        private GameManager gameManager;
        private bool clicking = false;
        private Button<bool> myClickState;
        private LampPlayer[] myPlayers;
        [IntrinsicProperty]
        public static object[] DebugText { get; set; }

        public Game()
        {
            Instance = this;
            gameManager = new GameManager();

            DebugText = new object[0];

        }

        public override void BindKeys(KeyboardJS manager)
        {
            manager.Bind.Key("space",() => { /*keydown*/},() => { /*keyup*/});
        }

        public override void Init(LampPlayer[] players, CanvasContext2D context)
        {
            myPlayers = players;
        }

        public override void Tick() {}

        public override void BuildUI(UIManager manager)
        {
            UIArea manageData;
            manager.AddArea(manageData = new UIArea(WindowLocation.Width - 400, 100, 250, 300) {Closable = true});
            manageData.Visible = true;
            manageData.AddControl(new TextArea(30, 25, "Manage Defense") {Color = "blue"});

            myClickState = null;
            myClickState = new Button<bool>(false, 20, 50, 100, 25, new Func<string>(() => { return myClickState.Data ? "This" : "That"; })) {Click = (p) => { myClickState.Data = !myClickState.Data; }};

            manageData.AddControl(myClickState);
            manageData.AddControl(new Button(20, 80, 100, 25, "Send Wave") {Click = (p) => { }});

            manageData.AddControl(new Button(20, 125, 100, 25, ( (Func<string>) ( () => { return DRAWFAST ? "Draw Slow" : "Draw Fast"; } ) )) {Click = (p) => { DRAWFAST = !DRAWFAST; }});
        }

        public override bool MouseMove(jQueryEvent jQueryEvent)
        {
            if (!clicking) return false;
            return false;
        }

        public override bool OnClick(jQueryEvent jQueryEvent)
        {
            clicking = true;
            return false;
        }

        public override bool MouseUp(jQueryEvent jQueryEvent)
        {
            clicking = false;

            return base.MouseUp(jQueryEvent);
        }

        public override void Draw(CanvasContext2D context)
        {
            context.FillStyle = "black";
            context.FillRect(100, 100, 200, 200);

            for (int i = 0; i < DebugText.Length; i++) {
                if (DebugText[i].Truthy()) {
                    context.Save();
                    context.StrokeStyle = "white";
                    context.StrokeText(DebugText[i].ToString(), WindowLocation.Width - 120, i * 20 + 150);
                    context.Restore();
                }
            }
        }
    }
}