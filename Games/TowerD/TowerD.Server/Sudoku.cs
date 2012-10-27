using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;
using CommonAPI;
using ServerAPI;
using SudokuCommon; 

namespace SudokuServer
{
    public class Sudoku : LampServer
    {
        [IntrinsicProperty]
        public JsDictionary<LampPlayer, SudokuServerPlayer> Players { get; set; }
        public Sudoku()
        {

        }
        public override void Init(LampPlayer[] players)
        {
            for (int index = 0; index < players.Length; index++)
            {
                var lampPlayer = players[index];
                lampPlayer.OnMessageRecieved += PlayerUpdateState;
                Players[lampPlayer] = new SudokuServerPlayer();
            }
        }

        private void PlayerUpdateState(LampPlayerMessageReceived ev)
        {
            var data=ev.GetData<SudokuPlayerMessage>();
            switch(data.MessageType)
            {
                case SudokuPlayerMessageType.NewNumber:
                    var nnMessageInfo=data.GetMessageInfo<SudokuPlayerNewNumberMessage>();
                    Players[ev.Player].NumberSet[nnMessageInfo.X][nnMessageInfo.Y] = nnMessageInfo.Number;

                    foreach (var player in Players)
                    {
                        player.Key.SendMessage(new SudokuServerMessage(new SudokuServerUpdateNumber(player.Value,nnMessageInfo.X,nnMessageInfo.Y)));
                    }
                    break;
            }
        }
    }

}
