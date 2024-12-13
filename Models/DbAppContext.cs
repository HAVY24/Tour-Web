using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models
{
    public class DbAppContext : DbContext
    {
        public DbAppContext() : base("name=DbAppContext") { }
        public virtual DbSet<TourPackage> TourPackages { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserProfile> UserProfiles { get; set; }
        public virtual DbSet<BlogPost> BlogPosts { get; set; }
        public virtual DbSet<Tour> Tours { get; set; }
        public virtual DbSet<Booking> Bookings { get; set; }
        public virtual DbSet<Payment> Payments { get; set; }
        public virtual DbSet<Schedule> Schedules { get; set; }
        public virtual DbSet<Traveler> Travelers { get; set; }
        public virtual DbSet<Contact> Contacts { get; set; }
        public virtual DbSet<Voucher> Vouchers { get; set; }
        public virtual DbSet<TourReview> TourReviews { get; set; }
        public virtual DbSet<PaymentCard> PaymentCards { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            /*modelBuilder.Entity<Booking>()
         .HasRequired(b => b.TourPackage)  // Booking has a required TourPackage
         .WithMany(tp => tp.Bookings)     // TourPackage has many Bookings
         .HasForeignKey(b => b.TourPackageId)
         .WillCascadeOnDelete(true);      // Enable cascade delete when TourPackage is deleted

            // TourPackage to TourReview (1-Many)
            modelBuilder.Entity<TourReview>()
                .HasRequired(tr => tr.TourPackage)  // TourReview has a required TourPackage
                .WithMany(tp => tp.TourReviews)    // TourPackage has many TourReviews
                .HasForeignKey(tr => tr.TourPackageId)
                .WillCascadeOnDelete(true);        // Enable cascade delete when TourPackage is deleted

            // TourPackage to Voucher (1-Many)
            modelBuilder.Entity<Voucher>()
                .HasRequired(v => v.TourPackage)  // Voucher has a required TourPackage
                .WithMany(tp => tp.Vouchers)     // TourPackage has many Vouchers
                .HasForeignKey(v => v.TourPackageId)
                .WillCascadeOnDelete(true);      // Enable cascade delete when TourPackage is deleted

            // TourPackage to Schedule (1-Many)
            modelBuilder.Entity<Schedule>()
                .HasRequired(s => s.TourPackage)  // Schedule has a required TourPackage
                .WithMany(tp => tp.Schedules)    // TourPackage has many Schedules
                .HasForeignKey(s => s.TourPackageId)
                .WillCascadeOnDelete(true);      // Enable cascade delete when TourPackage is deleted

            modelBuilder.Entity<Traveler>()
    .HasRequired(t => t.Booking)
    .WithMany(b => b.Travelers)
    .HasForeignKey(t => t.BookingId)
    .WillCascadeOnDelete(true);



            base.OnModelCreating(modelBuilder);*/
        }


    }
}