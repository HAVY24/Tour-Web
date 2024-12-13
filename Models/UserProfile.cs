using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models
{
    public class UserProfile
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public int? PostalCode { get; set; }
        public string AboutMe { get; set; }
        public string FriendNum { get; set; }
        public string PostNum { get; set; }
        public string CommentNum { get; set; }
        public string Avatar { get; set; }
        public string CoverAvatar { get; set; }
        public string Phone { get; set; }
        public DateTime? Birthday { get; set; }
        public string QuickIntroduction { get; set; }

        [Key]
        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

    }
}