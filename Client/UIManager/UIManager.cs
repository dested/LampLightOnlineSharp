using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Linq;
using System.Runtime.CompilerServices;
using CommonLibraries;
using OurSonic.UIManager;
using jQueryApi;
namespace Client.UIManager
{
    public class UIManager
    {
        public const string SmallTextFont = "8pt Calibri ";
        public const string ButtonFont = "12pt Calibri ";
        public const string SmallButtonFont = "13pt Arial bold ";
        public const string TextFont = "11pt Arial bold ";
        private static string _curLevelName;
        public readonly ClientManager ClientManagerManager;
        private List<string> messages = new List<string>();
        [IntrinsicProperty]
        public List<UIArea> UIAreas { get; set; }
        [IntrinsicProperty]
        public static UIManager Instance { get; set; }
        [IntrinsicProperty]
        private UIArea[] canvasDepths { get; set; }
        public static string CurLevelName
        {
            get { return _curLevelName; }
            set
            {
                UpdateTitle("- Our Sonic - " + value);

                _curLevelName = value;
            }
        }
        public UIManagerAreas UIManagerAreas { get; private set; }

        public UIManager(ClientManager ClientManagerManager)
        {
            Instance = this;
            UIAreas = new List<UIArea>();

            this.ClientManagerManager = ClientManagerManager;

            UIManagerAreas = new UIManagerAreas();
        }

        public bool OnClick(Pointer cell)
        {
            UIArea goodArea = null;
            var cl = ( UIAreas ).OrderBy((f) => -f.Depth).ToArray();
            foreach (var are in cl) {
                if (are.Visible &&
                    ( are.IsEditMode()
                              ? are.Y - are.EditorEngine.MaxSize() <= cell.Y &&
                                are.Y + are.EditorEngine.MaxSize() + are.Height > cell.Y &&
                                are.X - are.EditorEngine.MaxSize() <= cell.X &&
                                are.X + are.EditorEngine.MaxSize() + are.Width > cell.X
                              : are.Y <= cell.Y &&
                                are.Y + are.Height > cell.Y &&
                                are.X <= cell.X &&
                                are.X + are.Width > cell.X )) {
                    goodArea = are;
                    var ec = new Pointer(cell.X - are.X, cell.Y - are.Y, 0, cell.Right);
                    are.OnClick(ec);
                    break;
                }
            }

            if (goodArea.Truthy()) {
                foreach (var are in UIAreas) {
                    if (goodArea == are) {
                        are.Depth = 1;
                        are.Focus(cell);
                    } else {
                        if (are.Visible) {
                            are.Depth = 0;
                            are.LoseFocus();
                        }
                    }
                }

                return true;
            } else {
                foreach (var are in UIAreas) {
                    if (are.Visible) {
                        are.Depth = 0;
                        are.LoseFocus();
                    }
                }
            }

            return false;
        }

        public bool OnMouseMove(Pointer cell)
        {
            var cl = ( UIAreas ).OrderBy((f) => { return -f.Depth; }).ToArray();

            foreach (var are in cl) {
                if (are.Dragging.Truthy() || are.IsEditMode() || ( are.Visible && are.Y <= cell.Y &&
                                                                   are.Y + are.Height > cell.Y &&
                                                                   are.X <= cell.X &&
                                                                   are.X + are.Width > cell.X )) {
                    var cell2 = new Pointer(cell.X - are.X, cell.Y - are.Y, 0, cell.Right);
                    return are.OnMouseOver(cell2);
                }
            }

            return false;
        }

        public void OnMouseUp(Pointer cell)
        {
            foreach (var are in UIAreas) {
                var ec = new Pointer(cell.X - are.X, cell.Y - are.Y, 0, cell.Right);
                are.OnMouseUp(ec);
            }
        }

        public bool OnMouseScroll(jQueryEvent e)
        {
            int delta = e.Me().wheelDelta ? e.Me().wheelDelta / 40 : e.Me().detail ? -e.Me().detail : 0;

            var cell = CHelp.GetCursorPosition(e);

            foreach (var are in UIAreas) {
                if (are.Visible && are.Y <= cell.Y && are.Y + are.Height > cell.Y && are.X <= cell.X && are.X + are.Width > cell.X) {
                    var cell2 = new Pointer(cell.X - are.X, cell.Y - are.Y, delta, cell.Right);
                    return are.OnScroll(cell2);
                }
            }
            return false;
        }

        public bool OnKeyDown(ElementEvent jQueryEvent)
        {
            foreach (var are in UIAreas) {
                if (are.OnKeyDown(jQueryEvent)) return true;
            }
            return false;
        }

        public void AddArea(UIArea uiArea)
        {
            uiArea.Construct();
            UIAreas.Add(uiArea);

            UpdateDepth();
        }

        public void UpdateDepth()
        {
            canvasDepths = UIAreas.OrderBy(f => f.Depth).ToArray();
        }

        public void Draw(CanvasContext2D canvas)
        {
            canvas.Save();

            foreach (var are in canvasDepths) {
                are.Draw(canvas);
            }

            if (true /*DEBUGs*/) {
                for (var i = 0; i < messages.Count; i++) {
                    canvas.FillText(messages[i], 10, 25 + i * 30);
                }
            }

            canvas.Restore();
        }

        public static void UpdateTitle(string title)
        {
            Document.Title = title;
        }
    }
}