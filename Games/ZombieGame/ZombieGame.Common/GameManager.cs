using System;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonAPI;
using CommonClientLibraries.UIManager;
using CommonLibraries;
using ZombieGame.Common;
using ZombieGame.Common.JSONObjects;
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

        [IntrinsicProperty]
        public InstanceType InstanceType { get; set; }

        public GameManager( )
        { 
            TileManager = new TileManager(this);
            MapManager = new MapManager(this, 400, 400); 
            UnitManager = new UnitManager(this);  
        }

        public void LoadTiles(JsonTileMap jsonTileMap, Completed completed)
        {
            CHelp.LoadImageFromUrl(jsonTileMap.TileMapURL,
                                    (image) => {
                                        TileManager.LoadTiles(jsonTileMap, image, completed);
                                    });
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
    public enum InstanceType
    {
        Server,Client
    }
}