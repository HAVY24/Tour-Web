namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BlogPost",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Datetime = c.DateTime(),
                        Image = c.String(),
                        Content = c.String(),
                        Hashtags = c.String(),
                        Owner = c.String(),
                        CreatedAt = c.DateTime(),
                        UpdatedAt = c.DateTime(),
                        User_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.User", t => t.User_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.User",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Username = c.String(maxLength: 50),
                        Email = c.String(maxLength: 255),
                        Password = c.String(maxLength: 100),
                        Role = c.String(),
                        LastActive = c.DateTime(),
                        IsOnline = c.Boolean(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedAt = c.DateTime(),
                        UpdatedAt = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Email, unique: true);
            
            CreateTable(
                "dbo.Booking",
                c => new
                    {
                        TourPackageId = c.Int(nullable: false),
                        BookingDate = c.DateTime(nullable: false),
                        Status = c.String(),
                        NumOfPeople = c.Int(nullable: false),
                        CreatedAt = c.DateTime(),
                        UpdatedAt = c.DateTime(),
                        User_Id = c.Int(),
                    })
                .PrimaryKey(t => t.TourPackageId)
                .ForeignKey("dbo.TourPackage", t => t.TourPackageId)
                .ForeignKey("dbo.User", t => t.User_Id)
                .Index(t => t.TourPackageId)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.Contact",
                c => new
                    {
                        BookingId = c.Int(nullable: false),
                        Name = c.String(),
                        Phone = c.String(),
                        Email = c.String(),
                    })
                .PrimaryKey(t => t.BookingId)
                .ForeignKey("dbo.Booking", t => t.BookingId)
                .Index(t => t.BookingId);
            
            CreateTable(
                "dbo.Payment",
                c => new
                    {
                        BookingId = c.Int(nullable: false),
                        PaymentDate = c.DateTime(nullable: false),
                        PaymentMethod = c.String(),
                        PaymentAmount = c.String(),
                        PaymentStatus = c.String(),
                        TransactionId = c.String(),
                        CreatedAt = c.DateTime(),
                        UpdatedAt = c.DateTime(),
                    })
                .PrimaryKey(t => t.BookingId)
                .ForeignKey("dbo.Booking", t => t.BookingId)
                .Index(t => t.BookingId);
            
            CreateTable(
                "dbo.TourPackage",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        Image = c.String(),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Discount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Activity = c.String(),
                        CreatedAt = c.DateTime(),
                        UpdatedAt = c.DateTime(),
                        IsChangeSchedule = c.Boolean(nullable: false),
                        IsRefund = c.Boolean(nullable: false),
                        CheckIn = c.String(),
                        Tour_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Tour", t => t.Tour_Id)
                .Index(t => t.Tour_Id);
            
            CreateTable(
                "dbo.Tour",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Region = c.String(),
                        Country = c.String(),
                        City = c.String(),
                        Image = c.String(),
                        Opening = c.Time(precision: 7),
                        Ending = c.Time(precision: 7),
                        CreatedAt = c.DateTime(),
                        UpdateAt = c.DateTime(),
                        User_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.User", t => t.User_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.TourReview",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Star = c.Int(nullable: false),
                        Review = c.String(),
                        CreatedAt = c.DateTime(),
                        UpdatedAt = c.DateTime(),
                        TourPackage_Id = c.Int(),
                        User_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.TourPackage", t => t.TourPackage_Id)
                .ForeignKey("dbo.User", t => t.User_Id)
                .Index(t => t.TourPackage_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.Traveler",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Phone = c.String(),
                        Booking_TourPackageId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Booking", t => t.Booking_TourPackageId)
                .Index(t => t.Booking_TourPackageId);
            
            CreateTable(
                "dbo.UserProfile",
                c => new
                    {
                        UserId = c.Int(nullable: false),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Address = c.String(),
                        City = c.String(),
                        Country = c.String(),
                        PostalCode = c.Int(nullable: false),
                        AboutMe = c.String(),
                        FriendNum = c.String(),
                        PostNum = c.String(),
                        CommentNum = c.String(),
                        Avatar = c.String(),
                        CoverAvatar = c.String(),
                        Phone = c.String(),
                        Birthday = c.DateTime(),
                        QuickIntroduction = c.String(),
                    })
                .PrimaryKey(t => t.UserId)
                .ForeignKey("dbo.User", t => t.UserId)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Schedule",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TravelDay = c.DateTime(),
                        Quantity = c.Int(nullable: false),
                        TourPackage_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.TourPackage", t => t.TourPackage_Id)
                .Index(t => t.TourPackage_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Schedule", "TourPackage_Id", "dbo.TourPackage");
            DropForeignKey("dbo.UserProfile", "UserId", "dbo.User");
            DropForeignKey("dbo.BlogPost", "User_Id", "dbo.User");
            DropForeignKey("dbo.Booking", "User_Id", "dbo.User");
            DropForeignKey("dbo.Traveler", "Booking_TourPackageId", "dbo.Booking");
            DropForeignKey("dbo.Booking", "TourPackageId", "dbo.TourPackage");
            DropForeignKey("dbo.TourReview", "User_Id", "dbo.User");
            DropForeignKey("dbo.TourReview", "TourPackage_Id", "dbo.TourPackage");
            DropForeignKey("dbo.Tour", "User_Id", "dbo.User");
            DropForeignKey("dbo.TourPackage", "Tour_Id", "dbo.Tour");
            DropForeignKey("dbo.Payment", "BookingId", "dbo.Booking");
            DropForeignKey("dbo.Contact", "BookingId", "dbo.Booking");
            DropIndex("dbo.Schedule", new[] { "TourPackage_Id" });
            DropIndex("dbo.UserProfile", new[] { "UserId" });
            DropIndex("dbo.Traveler", new[] { "Booking_TourPackageId" });
            DropIndex("dbo.TourReview", new[] { "User_Id" });
            DropIndex("dbo.TourReview", new[] { "TourPackage_Id" });
            DropIndex("dbo.Tour", new[] { "User_Id" });
            DropIndex("dbo.TourPackage", new[] { "Tour_Id" });
            DropIndex("dbo.Payment", new[] { "BookingId" });
            DropIndex("dbo.Contact", new[] { "BookingId" });
            DropIndex("dbo.Booking", new[] { "User_Id" });
            DropIndex("dbo.Booking", new[] { "TourPackageId" });
            DropIndex("dbo.User", new[] { "Email" });
            DropIndex("dbo.BlogPost", new[] { "User_Id" });
            DropTable("dbo.Schedule");
            DropTable("dbo.UserProfile");
            DropTable("dbo.Traveler");
            DropTable("dbo.TourReview");
            DropTable("dbo.Tour");
            DropTable("dbo.TourPackage");
            DropTable("dbo.Payment");
            DropTable("dbo.Contact");
            DropTable("dbo.Booking");
            DropTable("dbo.User");
            DropTable("dbo.BlogPost");
        }
    }
}
