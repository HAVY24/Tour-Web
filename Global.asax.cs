using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Http.Cors;
using System.Web;
using WebBackendProject.App_Start;
using System.Data.Entity;
using System;
using MyAppNamespace;

namespace WebBackendProject
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            // Enable CORS globally
            var cors = new EnableCorsAttribute("*", "*", "*");
            GlobalConfiguration.Configuration.EnableCors(cors);  // Enable CORS for all controllers
            GlobalConfiguration.Configure(WebApiConfig.Register);

            // Register all areas, routes, and Web API configuration
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);

        }


    }
}
