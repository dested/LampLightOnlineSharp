using System.Runtime.CompilerServices;
namespace WebLibraries
{
    [Imported]
    public class KeyboardJS
    {
        [IntrinsicProperty]
        public KeyboardJSBind Bind { get; set; }

        [InlineCode("KeyboardJS")]
        public static KeyboardJS Instance()
        {
            return null;
        }
    }
}