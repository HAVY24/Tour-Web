namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_Model_231 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TestModel",
                c => new
                    {
                        TourPackageId = c.Int(nullable: false),
                        attribute = c.String(),
                    })
                .PrimaryKey(t => t.TourPackageId)
                .ForeignKey("dbo.TourPackage", t => t.TourPackageId)
                .Index(t => t.TourPackageId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TestModel", "TourPackageId", "dbo.TourPackage");
            DropIndex("dbo.TestModel", new[] { "TourPackageId" });
            DropTable("dbo.TestModel");
        }
    }
}
