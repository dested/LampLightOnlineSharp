using System;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using ClientAPI;
using CommonAPI;
using CommonClientLibraries.UIManager;
using CommonLibraries;
using WebLibraries;
using jQueryApi;
namespace ZakGame.Client
{
    public class Game : LampClient
    {

        public static Game Instance;
        private bool clicking = false;
        private Button<bool> myClickState;
        private LampPlayer[] myPlayers;
        [IntrinsicProperty]
        public static object[] DebugText { get; set; }

        public Game()
        {
            Instance = this;

            DebugText = new object[0];

        }

        public override void BindKeys(KeyboardJS manager)
        {
            manager.Bind.Key("space",() => { /*keydown*/},() => { /*keyup*/});
        }

 
          public override void Init(LampPlayer[] players, CanvasContext2D context)
        {

            myPlayers = players;

              someImage = new ImageElement();
              someImage.AddEventListener("load", e => { 
                  //idk do something when the image is loaded
              }, false);
              someImage.Src = "http://dested.com/lamp/Games/ZombieGame/assets/LostGarden+WoodTiles.png";


        }

 
        public override void Tick()
        {
            

        }

        private ImageElement someImage;

        public override void BuildUI(UIManager manager)
        {
            UIArea manageData;
            manager.AddArea(manageData = new UIArea(WindowLocation.Width - 400, 100, 250, 300) {Closable = true});
            manageData.Visible = true;
            manageData.AddControl(new TextArea(30, 25, "Manage Defense") {Color = "blue"});

            myClickState = null;
            myClickState = new Button<bool>(false,20,50,100,25,new Func<string>(() => {
                                                                 return myClickState.Data ? "This" : "That";
                                                             })) {
                                                                         Click = (p) => { myClickState.Data = !myClickState.Data; }
                                                                 };

            manageData.AddControl(myClickState);
            manageData.AddControl(new Button(20, 80, 100, 25, "Send Wave") {Click = (p) => {
                //idk do something on button click
                                                                                    }}); 
        }

        public override bool MouseMove(jQueryEvent jQueryEvent)
        {
            if (!clicking) return false;
            return false;
        }

        public override bool OnClick(jQueryEvent jQueryEvent)
        {
            clicking = true;
            var x = jQueryEvent.ClientX;
            var y = jQueryEvent.ClientY;

            DebugText[0] = x + " " + y;
            //idk do something with xy
            return false;
        }

        public override bool MouseUp(jQueryEvent jQueryEvent)
        {
            clicking = false;

            return false;
        }

        public override void Draw(CanvasContext2D context)
        {
            
            
            
            context.FillStyle = "red";
            context.FillRect(100, 100, 200, 200);


            context.DrawImage(someImage, 250, 250);
            context.DrawImage(someImage, 350, 350,100,100,200,200,100,100);

             








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