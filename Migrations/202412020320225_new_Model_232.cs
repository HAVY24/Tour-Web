namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_Model_232 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.TestModel", "TourPackageId", "dbo.TourPackage");
            DropPrimaryKey("dbo.TestModel");
            AddColumn("dbo.TestModel", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.TestModel", "Id");
            AddForeignKey("dbo.TestModel", "TourPackageId", "dbo.TourPackage", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TestModel", "TourPackageId", "dbo.TourPackage");
            DropPrimaryKey("dbo.TestModel");
            DropColumn("dbo.TestModel", "Id");
            AddPrimaryKey("dbo.TestModel", "TourPackageId");
            AddForeignKey("dbo.TestModel", "TourPackageId", "dbo.TourPackage", "Id");
        }
    }
}
