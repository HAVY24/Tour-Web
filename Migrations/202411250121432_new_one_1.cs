namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_one_1 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Booking", "TourPackageId", "dbo.TourPackage");
            DropForeignKey("dbo.Contact", "BookingId", "dbo.Booking");
            DropForeignKey("dbo.Payment", "BookingId", "dbo.Booking");
            DropForeignKey("dbo.Traveler", "Booking_TourPackageId", "dbo.Booking");
            RenameColumn(table: "dbo.Traveler", name: "Booking_TourPackageId", newName: "Booking_Id");
            RenameIndex(table: "dbo.Traveler", name: "IX_Booking_TourPackageId", newName: "IX_Booking_Id");
            DropPrimaryKey("dbo.Booking");
            AddColumn("dbo.Booking", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.Booking", "Id");
            AddForeignKey("dbo.Booking", "TourPackageId", "dbo.TourPackage", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Contact", "BookingId", "dbo.Booking", "Id");
            AddForeignKey("dbo.Payment", "BookingId", "dbo.Booking", "Id");
            AddForeignKey("dbo.Traveler", "Booking_Id", "dbo.Booking", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Traveler", "Booking_Id", "dbo.Booking");
            DropForeignKey("dbo.Payment", "BookingId", "dbo.Booking");
            DropForeignKey("dbo.Contact", "BookingId", "dbo.Booking");
            DropForeignKey("dbo.Booking", "TourPackageId", "dbo.TourPackage");
            DropPrimaryKey("dbo.Booking");
            DropColumn("dbo.Booking", "Id");
            AddPrimaryKey("dbo.Booking", "TourPackageId");
            RenameIndex(table: "dbo.Traveler", name: "IX_Booking_Id", newName: "IX_Booking_TourPackageId");
            RenameColumn(table: "dbo.Traveler", name: "Booking_Id", newName: "Booking_TourPackageId");
            AddForeignKey("dbo.Traveler", "Booking_TourPackageId", "dbo.Booking", "TourPackageId");
            AddForeignKey("dbo.Payment", "BookingId", "dbo.Booking", "TourPackageId");
            AddForeignKey("dbo.Contact", "BookingId", "dbo.Booking", "TourPackageId");
            AddForeignKey("dbo.Booking", "TourPackageId", "dbo.TourPackage", "Id");
        }
    }
}
