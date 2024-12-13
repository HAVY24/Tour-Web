namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_oneeeee : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Traveler", "Booking_Id", "dbo.Booking");
            DropIndex("dbo.Traveler", new[] { "Booking_Id" });
            RenameColumn(table: "dbo.Traveler", name: "Booking_Id", newName: "BookingId");
            AlterColumn("dbo.Traveler", "BookingId", c => c.Int(nullable: false));
            CreateIndex("dbo.Traveler", "BookingId");
            AddForeignKey("dbo.Traveler", "BookingId", "dbo.Booking", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Traveler", "BookingId", "dbo.Booking");
            DropIndex("dbo.Traveler", new[] { "BookingId" });
            AlterColumn("dbo.Traveler", "BookingId", c => c.Int());
            RenameColumn(table: "dbo.Traveler", name: "BookingId", newName: "Booking_Id");
            CreateIndex("dbo.Traveler", "Booking_Id");
            AddForeignKey("dbo.Traveler", "Booking_Id", "dbo.Booking", "Id");
        }
    }
}
