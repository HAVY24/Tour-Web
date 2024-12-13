using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebBackendProject.Helpers
{
    public static class GetFullException
    {
        public static string GetFullExceptionMessage(Exception ex)
        {
            var message = ex.Message;
            var innerException = ex.InnerException;

            while (innerException != null)
            {
                message += " --> " + innerException.Message;
                innerException = innerException.InnerException;
            }
            return message;
        }
    }
}