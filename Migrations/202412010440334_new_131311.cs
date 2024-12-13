namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_131311 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TourPackage", "Quantity", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.TourPackage", "Quantity");
        }
    }
}
