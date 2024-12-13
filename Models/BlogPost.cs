using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models
{
    public class BlogPost
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public DateTime? Datetime { get; set; }
        [Required]
        public string Image { get; set; }
        [Required]
        public string Content { get; set; }
        public string Hashtags { get; set; }
        [Required]
        public string Owner { get; set; }
        public bool IsAdminPost { get; set; }
        public string Status { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public bool IsDeleted { get; set; }
        public User User { get; set; }
    }
}