using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebBackendProject.DTO.PaymentCard
{
    public class CardAddress
    {
        public int user_id { get; set; }
        public string billingAddress { get; set; }
    }
}