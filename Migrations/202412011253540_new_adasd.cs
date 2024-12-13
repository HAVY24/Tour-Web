namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_adasd : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.TourPackage", "Tour_Id", "dbo.Tour");
            DropIndex("dbo.TourPackage", new[] { "Tour_Id" });
            RenameColumn(table: "dbo.TourPackage", name: "Tour_Id", newName: "TourId");
            AlterColumn("dbo.TourPackage", "TourId", c => c.Int(nullable: false));
            CreateIndex("dbo.TourPackage", "TourId");
            AddForeignKey("dbo.TourPackage", "TourId", "dbo.Tour", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TourPackage", "TourId", "dbo.Tour");
            DropIndex("dbo.TourPackage", new[] { "TourId" });
            AlterColumn("dbo.TourPackage", "TourId", c => c.Int());
            RenameColumn(table: "dbo.TourPackage", name: "TourId", newName: "Tour_Id");
            CreateIndex("dbo.TourPackage", "Tour_Id");
            AddForeignKey("dbo.TourPackage", "Tour_Id", "dbo.Tour", "Id");
        }
    }
}
