using System.Web.Http;
using Swashbuckle.Application;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(MyAppNamespace.SwaggerConfig), "Register")]

namespace MyAppNamespace
{
    public class SwaggerConfig
    {
        public static void Register()
        {
            var config = GlobalConfiguration.Configuration;

            // Enable Swagger
            config
                .EnableSwagger(c =>
                {
                    c.SingleApiVersion("v1", "My API")
                        .Description("API documentation for My Project")
                        .TermsOfService("Terms of Service URL")
                        .Contact(cc => cc
                            .Name("Your Name")
                            .Url("https://localhost:44331/")
                            .Email("your.email@domain.com"));

                    // Optional: Include XML comments for better documentation (if XML documentation is enabled)
                    var xmlPath = System.AppDomain.CurrentDomain.BaseDirectory + @"bin\WebBackendProject.xml";
                    c.IncludeXmlComments(xmlPath);

                })
                .EnableSwaggerUi(c =>
                {
                    // Optional: Customize the Swagger UI
                    c.DocumentTitle("My API Documentation");
                });
        }
    }
}
