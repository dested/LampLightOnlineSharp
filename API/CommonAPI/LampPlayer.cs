using System;
namespace CommonAPI
{
    [Serializable]
    public class LampPlayer : UserModel
    {
        public string PlayerName { get; set; }

        public LampPlayer(UserModel user)
        {
            Gateway = user.Gateway;
            UserName = user.UserName;
            PlayerName = UserName;
        }
    }
}