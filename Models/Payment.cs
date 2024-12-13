using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models
{
    public class Payment
    {
        public DateTime PaymentDate { get; set; }
        public string PaymentMethod { get; set; }
        public float PaymentAmount { get; set; }
        public string PaymentStatus { get; set; }
        public string TransactionId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        [Key]
        [ForeignKey("Booking")]
        public int BookingId { get; set; }
        public Booking Booking { get; set; }
    }
}