using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models.DTO
{
    public class PaymentInfo
    {
        public string PaymentMethod { get; set; }
        public float PaymentAmount { get; set; }
        public string PaymentStatus { get; set; }
        public string TransactionId { get; set; }
        public int BookingId { get; set; }
    }
}