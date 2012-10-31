using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using ClientAPI;
using CommonAPI;
using CommonClientLibraries.UIManager;
using CommonLibraries;
using jQueryApi;
namespace ZombieGame.Client
{
    public class Game : LampClient
    {
        public static bool DRAWFAST;
        public Point Scale = new Point(40, 30);
        private bool clicking = false;
        private Button<int> myClickState;
        private LampPlayer[] myPlayers; 
        public static Game Instance; 
        [IntrinsicProperty]
        public static object[] DebugText { get; set; }

        public Game()
        {
            Instance = this;
            DebugText = new object[0];
          
/*
            KeyboardJS.Instance().Bind.Key("space",
                                           () => {
                                           },
                                           () => { });
*/
        }

        public override void Init(LampPlayer[] players, CanvasContext2D context)
        {
            myPlayers = players;
             
        }

        public override void Tick()
        { 
        }

        public override void BuildUI(UIManager manager)
        {
            UIArea manageData;
            manager.AddArea(manageData = new UIArea(WindowLocation.Width - 400, 100, 250, 300) {Closable = true});
            manageData.Visible = true;
            manageData.AddControl(new TextArea(30, 25, "Manage Defense") {Color = "blue"});

            myClickState = null;
            myClickState = new Button<int>(0,20,50,100,25,(Func<string>) ( () => {
                                                                switch (myClickState.Data) {
                                                                    case 0:
                                                                        return "Move Kingdom";
                                                                    case 1:
                                                                        return "Move Waypoint";
                                                                    case 2:
                                                                        return "Add Waypoint";
                                                                    case 3:
                                                                        return "Place Tower";
                                                                }
                                                                return "";
                                                            } )) {
                                                                         Click = (p) => {
                                                                                     myClickState.Data++;
                                                                                     myClickState.Data = myClickState.Data % 4;
                                                                                 }
                                                                 };
            manageData.AddControl(myClickState);
            manageData.AddControl(new Button(20, 80, 100, 25, "Send Wave") {
                                                                                   Click = (p) => {
                                                                                           }
                                                                           });

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
            context.FillRect(100,100,200, 200);
              
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