using System;
using System.Web.Mvc;

namespace DemoSvg.Controllers
{
    public class JasmineController : Controller
    {
        public ViewResult Run()
        {
            return View("SpecRunner");
        }
    }
}
