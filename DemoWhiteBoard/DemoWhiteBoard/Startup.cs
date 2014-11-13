using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DemoWhiteBoard.Startup))]
namespace DemoWhiteBoard
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
