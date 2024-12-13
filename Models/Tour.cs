using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Security.Policy;

namespace WebBackendProject.Models
{
    public class Tour
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Region { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Image { get; set; }
        public bool IsDeleted { get; set; }
        public string Description { get; set; }
        public TimeSpan? Opening { get; set; }
        public TimeSpan? Ending { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdateAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public ICollection<TourPackage> TourPackages { get; set; }
    }
}