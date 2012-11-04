using System;
using System.Collections.Generic;
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
            UpdatePosition(X, Y);
        }

        public virtual void Draw(CanvasContext2D context) {}

        public virtual void MoveTowards(int x, int y)
        {
            movingTowards = new Point(x, y);

            new WaypointDeterminer(new Point(this.X, this.Y), new Point(x, y), MoveRate, myGameManager.MapManager.CollisionMap);
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
        private readonly CollisionType[][] myCollisionMap;

        public WaypointDeterminer(Point start, Point end, double moveRate, CollisionType[][] collisionMap)
        {
            myCollisionMap = collisionMap;

            int _x = start.X, _y = start.Y;

            //[x][y]
            /*
            switch (collisionMap[0][0]) {
                case CollisionType.Empty:
                    break;
                case CollisionType.Full:
                    break;
                case CollisionType.RightHalf:
                    break;
                case CollisionType.TopHalf:
                    break;
                case CollisionType.LeftHalf:
                    break;
                case CollisionType.BottomHalf:
                    break;
            }*/

            /*
            int _x=start.X, _y=start.Y;

            while (true) {
                if (Math.Abs(end.X - start.X) < 6 && Math.Abs(end.Y - start.X) < 6) //6 chosen arbitrarily
                    break;
                else {
                    var m = end.Negate(_x, _y).Normalize(moveRate);
                    _x += m.X;
                    _y += m.Y;
                    Points.Add(new Waypoint() {X = _x, Y = _y});
                }
            }*/

            //If area mouse clicked is empty, attempt to calculate path to coordinate
            if (myCollisionMap[end.X][end.Y] == CollisionType.Empty)
            {
                var openList = new List<AStarNode>();
                var closedList = new List<AStarNode>();

                //Add start coord to openlist
                openList.Add(new AStarNode(0, (Math.Abs((int)(start.X - end.X)) + Math.Abs((int)(start.Y - end.Y))) * AStarNode.LateralCost, null, new Point(start.X, start.Y)));

                //While still nodes to search on frontier
                while (openList.Count > 0)
                {
                    int lowestCost = int.MaxValue;
                    AStarNode currentNode = null;

                    //Find lowest cost node and set it to current
                    foreach (var node in openList)
                    {
                        if (node.TotalCost < lowestCost)
                        {
                            lowestCost = node.TotalCost;
                            currentNode = node;
                        }
                    }

                    //switch current node from open list to closed list
                    openList.Remove(currentNode);
                    closedList.Add(currentNode);

                    //Build list of directly adjacent nodes that are walkable
                    var eligibleAdjacent = new List<AStarNode>();
                    int currentX = currentNode.Coordinate.X;
                    int currentY = currentNode.Coordinate.Y;

                    //Column left of current node
                    if (currentX - 1 >= 0)
                    {
                        if (myCollisionMap[currentX - 1][currentY] == CollisionType.Empty)
                        {

                        }
                    }

                }
            }
        }


        [IntrinsicProperty]
        public List<Waypoint> Points { get; set; }

 
        public bool Tick()
        {
            return false;
        }
    }
    public class Waypoint
    {
        [IntrinsicProperty]
        public int X { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }
    }
    public class AStarNode
    {
        public const int LateralCost = 10;
        public const int DiagonalCost = 14;

        [IntrinsicProperty]
        public int TotalCost { get; set; }
        [IntrinsicProperty]
        public int MovementCost { get; set; }
        [IntrinsicProperty]
        public int HeuristicCost { get; set; }
        [IntrinsicProperty]
        public AStarNode Parent { get; set; }
        [IntrinsicProperty]
        public Point Coordinate { get; set; }

        public AStarNode(int movementCost, int heuristicCost, AStarNode parent, Point coord)
        {
            TotalCost = movementCost + heuristicCost;
            MovementCost = movementCost;
            HeuristicCost = heuristicCost;
            Parent = parent;
            Coordinate = coord;
        }
    }
    
}