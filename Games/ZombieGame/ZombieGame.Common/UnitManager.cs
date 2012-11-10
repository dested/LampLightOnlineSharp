using System;
using System.Runtime.CompilerServices;
using CommonLibraries;
namespace ZombieGame.Common
{
    public class UnitManager
    {
        private readonly GameManager myGameManager;
        private Point CharacterCenterPadding = new Point(150, 150);
        [IntrinsicProperty]
        public Person MainCharacter { get; set; }
        [IntrinsicProperty]
        public Action<int, int> MainCharacterUpdate { get; set; }

        public UnitManager(GameManager gameManager)
        {
            myGameManager = gameManager;
        }

        public void Init()
        {
            MainCharacter = new Person(myGameManager) {
                                                              X = 100,
                                                              Y = 170,
                                                              UpdatePosition = MainCharacterUpdate
                                                      };

            MainCharacter.Init();
        }

        public void Tick()
        {
            MainCharacter.Tick();
        }
    }
}