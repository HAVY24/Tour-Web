namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_Attribute_2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Voucher", "Code", c => c.String());
            AddColumn("dbo.Voucher", "CreatedAt", c => c.DateTime());
            AddColumn("dbo.Voucher", "UpdatedAt", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Voucher", "UpdatedAt");
            DropColumn("dbo.Voucher", "CreatedAt");
            DropColumn("dbo.Voucher", "Code");
        }
    }
}
