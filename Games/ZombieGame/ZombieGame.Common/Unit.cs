using System;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonLibraries;
namespace ZombieGame.Common
{
    public class Unit
    {
        private Point movingTowards;
        private GameManager myGameManager;
        [IntrinsicProperty]
        public int X { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }
        [IntrinsicProperty]
        public double MoveRate { get; set; }
        [IntrinsicProperty]
        public Action<int, int> UpdatePosition { get; set; }

        public Unit(GameManager gameManager)
        {
            myGameManager = gameManager;
            MoveRate = 2;
        }

        public virtual void Init()
        {
            if (UpdatePosition != null)
                UpdatePosition(X, Y);
        }

        public virtual void Draw(CanvasContext2D context) {}

        public virtual void MoveTowards(int x, int y)
        {
            movingTowards = new Point(x, y);

            //new WaypointDeterminer(new Point(X, Y), new Point(x, y), MoveRate, myGameManager.MapManager.CollisionMap);
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
                    if (UpdatePosition != null)
                        UpdatePosition(X, Y);
                }
            }
        }
    }
}