namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_Attribute_1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TourPackage", "VAT", c => c.Decimal(nullable: false, precision: 18, scale: 2));
        }
        
        public override void Down()
        {
            DropColumn("dbo.TourPackage", "VAT");
        }
    }
}
