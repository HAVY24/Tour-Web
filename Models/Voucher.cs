using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models
{
    public class Voucher
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public Decimal Discount { get; set; }
        public string Title { get; set; }
        public string Code { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        [ForeignKey("TourPackage")]
        public int TourPackageId { get; set; }
        public TourPackage TourPackage { get; set; }
    }
}