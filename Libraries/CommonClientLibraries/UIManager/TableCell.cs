using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonLibraries;
namespace CommonClientLibraries.UIManager
{
    public class TableCell : Panel
    {
        [IntrinsicProperty]
        public SizeNumber CellHeight { get; set; }
        [IntrinsicProperty]
        public SizeNumber CellWidth { get; set; }
        [IntrinsicProperty]
        public bool FullSize { get; set; }
        [IntrinsicProperty]
        public int RowSpan { get; set; }
        [IntrinsicProperty]
        public int ColSpan { get; set; }
        public TableRow Row
        {
            get { return (TableRow) Parent; }
        }

        public TableCell(SizeNumber width, SizeNumber height)
                : base(0, 0, 0, 0)
        {
            CellWidth = width;
            CellHeight = height;
            Outline = true;
            FullSize = true;
        }

        public TableCell()
                : base(0, 0, 0, 0) {}

        public override void Focus(Pointer e)
        {
            base.Focus(e);
        }

        public override void LoseFocus()
        {
            base.LoseFocus();
        }

        public override void Construct()
        {
            base.Construct();
        }

        public override bool OnKeyDown(ElementEvent e)
        {
            return base.OnKeyDown(e);
        }

        public override bool OnClick(Pointer e)
        {
            return base.OnClick(e);
        }

        public override bool OnMouseOver(Pointer e)
        {
            return base.OnMouseOver(e);
        }

        public override bool OnMouseUp(Pointer e)
        {
            return base.OnMouseUp(e);
        }

        public override bool OnScroll(Pointer e)
        {
            return base.OnScroll(e);
        }

        public override void Draw(CanvasContext2D canv)
        {
            Width = (int) (double) CellWidth;
            Height = (int) (double) CellHeight;

            base.Draw(canv);
        }
    }
}