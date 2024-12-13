using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebBackendProject.Utils
{
    public class GlobalExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext filterContext)
        {
            var exception = filterContext.Exception;

            System.Diagnostics.Debug.WriteLine($"Exception: {exception.Message}");

            var isDevelopment = System.Web.HttpContext.Current.IsDebuggingEnabled;

            filterContext.Result = new JsonResult
            {
                Data = new
                {
                    Message = "An unexpected error occurred.",
                    Exception = isDevelopment ? exception.Message : null,
                    InnerException = isDevelopment ? exception.InnerException?.Message : null,
                    DetailedInnerException = isDevelopment ? exception.InnerException?.InnerException?.Message : null,
                    StackTrace = isDevelopment ? exception.StackTrace : null
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

            filterContext.HttpContext.Response.StatusCode = 500;

            filterContext.ExceptionHandled = true;
        }
    }
}