using System.Runtime.CompilerServices;
using CommonLibraries;
namespace ZombieGame.Common
{
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