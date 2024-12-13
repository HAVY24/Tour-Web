using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models
{
    public class Schedule
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public DateTime? TravelDay { get; set; }
        public int Quantity { get; set; }
        [ForeignKey("TourPackage")]
        public int TourPackageId { get; set; }
        public TourPackage TourPackage { get; set; }
    }
}