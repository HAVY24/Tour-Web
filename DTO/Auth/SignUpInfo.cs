using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models.DTO
{
    public class SignUpInfo
    {
        [EmailAddress]
        [StringLength(255)]
        [Index(IsUnique = true)]
        public string Email { get; set; }

        [StringLength(50, MinimumLength = 3)]
        public string Username { get; set; }

        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; }

    }
}