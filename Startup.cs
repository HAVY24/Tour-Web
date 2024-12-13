using Hangfire;
using Microsoft.Owin;
using Owin;
using WebBackendProject.Controllers;
using WebBackendProject.Controllers.Api;
using WebBackendProject.Helpers;

[assembly: OwinStartup(typeof(WebBackendProject.Startup))] // Add this line to specify Owin Startup

namespace WebBackendProject
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {// Hangfire configuration
            string connectionString = DbConfig.GetConnectionString();
            Hangfire.GlobalConfiguration.Configuration.UseSqlServerStorage(connectionString);

            // Start Hangfire server
            app.UseHangfireServer();

            RecurringJob.AddOrUpdate(
                "UpdateUserStatus",                               // Unique job identifier
                () => new UserApiController().UpdateUserStatus(),   // Instance method call
                Cron.Minutely                                    // Schedule (every minute)
         );


            // Set up Hangfire Dashboard (optional, to view jobs)
            app.UseHangfireDashboard("/hangfire", new DashboardOptions
            {
                AppPath = null, // Optional: Set this to redirect to your main app if needed
                DashboardTitle = "Process Of Travel website" // Set the custom title here
            });

        }
    }
}
