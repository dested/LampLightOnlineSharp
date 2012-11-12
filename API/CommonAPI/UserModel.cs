using System;
namespace CommonAPI
{
    [Serializable]
    public class UserModel
    {
        public string Gateway { get; set; }
        public string UserName { get; set; }
    }
}