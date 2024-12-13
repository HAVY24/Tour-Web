using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models
{
    public class TourPackage
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public Decimal Price { get; set; }
        public string Activities { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsChangeSchedule { get; set; }
        public bool IsRefund { get; set; }
        public string CheckIn {  get; set; }
        public decimal VAT { get; set; }
        public int Quantity { get; set; }
        public int TourId { get; set; }
        public Tour Tour { get; set; }
        public ICollection<Booking> Bookings { get; set; }
        public ICollection<TourReview> TourReviews { get; set; }
        public ICollection<Voucher> Vouchers { get; set; }
        public ICollection<Schedule> Schedules { get; set; }


    }
}