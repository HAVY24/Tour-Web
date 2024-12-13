using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        [StringLength(50, MinimumLength = 3)]
        public string Username { get; set; }
        [EmailAddress]
        [StringLength(255)]
        [Index(IsUnique = true)]
        public string Email { get; set; }
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; }
        public string Role { get; set; }
        public DateTime? LastActive { get; set; }
        public Boolean IsOnline { get; set; }
        public Boolean IsBanned { get; set; }
        public Boolean IsDeleted { get; set; }
        public Boolean IsProfileBlocked { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public string VerificationCode { get; set; }
        public DateTime? VerificationCodeExpiration { get; set; }
        public UserProfile UserProfile { get; set; }
        public ICollection<Tour> Tours { get; set; }
        public ICollection<BlogPost> Posts { get; set; }
        public ICollection<TourReview> TourReviews { get; set; }
        public ICollection<Booking> Bookings { get; set; }
        public ICollection<PaymentCard> PaymentCards { get; set; }
    }
}