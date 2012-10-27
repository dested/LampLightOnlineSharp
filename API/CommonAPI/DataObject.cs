using System.Runtime.CompilerServices;
namespace CommonAPI
{
    public class DataObject<T>
    {
        [IntrinsicProperty]
        [PreserveCase]
        public T Data { get; set; }

        public DataObject(T data)
        {
            Data = data;
        }
    }
}