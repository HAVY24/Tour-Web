namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_Model1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Voucher",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Discount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Title = c.String(),
                        TourPackage_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.TourPackage", t => t.TourPackage_Id)
                .Index(t => t.TourPackage_Id);
            
            DropColumn("dbo.TourPackage", "Discount");
        }
        
        public override void Down()
        {
            AddColumn("dbo.TourPackage", "Discount", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            DropForeignKey("dbo.Voucher", "TourPackage_Id", "dbo.TourPackage");
            DropIndex("dbo.Voucher", new[] { "TourPackage_Id" });
            DropTable("dbo.Voucher");
        }
    }
}
