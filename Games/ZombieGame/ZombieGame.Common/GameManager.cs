using System.Runtime.CompilerServices;
namespace ZombieGame.Common
{
    public abstract class GameManager
    {
        [IntrinsicProperty]
        public TileManager TileManager { get; set; }
        [IntrinsicProperty]
        public MapManager MapManager { get; set; }
        [IntrinsicProperty]
        public UnitManager UnitManager { get; set; }

        public GameManager()
        {
            TileManager = new TileManager(this);
            MapManager = new MapManager(this, 400, 400);
            UnitManager = new UnitManager(this);
        }

        public void Init()
        {
            UnitManager.Init();
        }

        public void Tick()
        {
            UnitManager.Tick();
        }
    }
}