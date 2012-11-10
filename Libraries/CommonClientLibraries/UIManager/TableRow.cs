using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonLibraries;
namespace CommonClientLibraries.UIManager
{
    public class TableRow : Element
    {
        [IntrinsicProperty]
        public List<TableCell> Cells { get; set; }
        public SizeNumber RowHeight { get; set; }
        public Table Table
        {
            get { return (Table) Parent; }
        }

        public TableRow(SizeNumber height)
                : base(0, 0)
        {
            RowHeight = height;
            Cells = new List<TableCell>();
        }

        public bool ChildrenAreEditing()
        {
            var ch = Cells;
            foreach (TableCell t in ch) {
                if (t.EditorEngine.Dragging.Truthy() || t.EditorEngine.Editing)
                    return true;
                if (t.ChildrenAreEditing())
                    return true;
            }
            return false;
        }

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
            base.Draw(canv);
        }

        public virtual TableCell AddCell(TableCell element)
        {
            element.Parent = this;

            element.Construct();

            Cells.Add(element);
            return element;
        }
    }
}