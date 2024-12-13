using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models
{
    public class Booking
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        [Required]
        public DateTime BookingDate { get; set; }
        public string Status { get; set; }
        [Required]
        public int NumOfPeople { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public User User { get; set; }
        public Payment Payment { get; set; }
        public ICollection<Traveler> Travelers { get; set; }
        public Contact Contact { get; set; }
            
        [ForeignKey("TourPackage")]
        public int TourPackageId { get; set; }
        public TourPackage TourPackage { get; set; }
    }
}