using System;
namespace CommonAPI
{
    [Serializable]
    public abstract class LampActionProduct : LampMessage
    {
        protected LampActionProduct()
        {
            GatewayChannel = "Game";

            Type = LampMessageType.Product;
        }
    }
}