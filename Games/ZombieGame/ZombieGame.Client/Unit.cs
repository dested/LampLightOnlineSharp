using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonLibraries;
namespace ZombieGame.Client
{
    public class Unit
    {
        private Point movingTowards;
        [IntrinsicProperty]
        public int X { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }
        [IntrinsicProperty]
        public int MoveRate { get; set; }
        [IntrinsicProperty]
        public Action<int, int> UpdatePosition { get; set; }

        public Unit()
        {
            MoveRate = 2;
        }

        public virtual void Init()
        {
            UpdatePosition(X, Y);
        }

        public virtual void Draw(CanvasContext2D context)
        {
            
        }

        public virtual void MoveTowards(int x, int y)
        {
            movingTowards = new Point(x, y);
        }

        public virtual void Tick()
        {
            if (movingTowards != null) {
                if (Math.Abs(movingTowards.X - X) < 6 && Math.Abs(movingTowards.Y - Y) < 6) //6 chosen arbitrarily
                    movingTowards = null;
                else {
                    var m = movingTowards.Negate(X, Y).Normalize(MoveRate);
                    X += m.X;
                    Y += m.Y;
                    UpdatePosition(X, Y);
                }
            }
        }
    }
    public class WaypointDeterminer
    {
        public WaypointDeterminer(Point start, Point end,int moveRate)
        {
            int _x=start.X, _y=start.Y;

            while (true) {
                if (Math.Abs(end.X - start.X) < 6 && Math.Abs(end.Y - start.X) < 6) //6 chosen arbitrarily
                    break;
                else {
                    var m = end.Negate(_x, _y).Normalize(moveRate);
                    _x += m.X;
                    _y += m.Y;
                    Points.Add(new Waypoint(){X=_x,Y=_y});
                }
            }
        }
        public bool Tick()
        {
            
        }

        [IntrinsicProperty]
        public List<Waypoint> Points { get; set; }
    }
    public class Waypoint
    {
        [IntrinsicProperty]
        public int X { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }
        
    }
}