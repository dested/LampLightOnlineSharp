using System;
using CommonLibraries;
namespace CommonClientLibraries.UIManager
{
    [Serializable]
    public class EditorEnginePoint
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int Size { get; set; }
        public string Cursor { get; set; }
        public Action<Point> Click { get; set; }
        public bool Editing { get; set; }

        public EditorEnginePoint(int x, int y, int size, string cursor, Action<Point> click)
        {
            X = x;
            Y = y;
            Size = size;
            Cursor = cursor;
            Click = click;
        }
    }
}