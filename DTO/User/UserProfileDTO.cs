﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models.DTO
{
    public class UserProfileDTO
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public int PostalCode { get; set; }
        public string AboutMe { get; set; }
        public string Phone { get; set; }
        public DateTime? Birthday { get; set; }
        public string QuickIntroduction { get; set; }
    }
}