using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebBackendProject.DTO.Payment
{
    public class PaymentStatus
    {
        public int bookingId { get; set; }
        public string status { get; set; }
    }
}