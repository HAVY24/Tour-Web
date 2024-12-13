using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models
{
    public class PaymentCard
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id {  get; set; }
        public string Type { get; set; }
        public string CardholderName { get; set; }
        public int Last4Digits { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public string BillingAddress { get; set; }
        public string CardToken { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public User User { get; set; }
    }
}