namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class delete_Model_232 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.TestModel", "TourPackageId", "dbo.TourPackage");
            DropIndex("dbo.TestModel", new[] { "TourPackageId" });
            DropTable("dbo.TestModel");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.TestModel",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        attribute = c.String(),
                        TourPackageId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateIndex("dbo.TestModel", "TourPackageId");
            AddForeignKey("dbo.TestModel", "TourPackageId", "dbo.TourPackage", "Id", cascadeDelete: true);
        }
    }
}
