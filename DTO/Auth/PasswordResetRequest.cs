using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebBackendProject.DTO.Auth
{
    public class PasswordResetRequest
    {
        public string Email { get; set; }
        public string NewPassword { get; set; }
        public string VerificationCode { get; set; }
    }
}