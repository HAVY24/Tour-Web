using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebBackendProject.DTO.Auth
{
    public class PasswordCheck
    {
        public string password { get; set; }
        public int? user_id { get; set; }
    }
}