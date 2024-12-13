using System.Web.Http;
using System.Web.Http.Cors;

namespace WebBackendProject.App_Start
{
    public static class WebApiConfig
    {

        public static void Register(HttpConfiguration config)
        {
            // Enable attribute routing

            config.MapHttpAttributeRoutes();

            // Default Web API route if needed
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
