using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebBackendProject.DTO.Auth
{
    public class ResetPassword
    {
        public string Token { get; set; }
        public string NewPassword { get; set; }
    }
}