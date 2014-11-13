using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DemoSvg.Startup))]
namespace DemoSvg
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
