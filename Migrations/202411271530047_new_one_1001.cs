namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_one_1001 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Booking", "IsDeleted", c => c.Boolean(nullable: false));
            DropColumn("dbo.Payment", "IsDeleted");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Payment", "IsDeleted", c => c.Boolean(nullable: false));
            DropColumn("dbo.Booking", "IsDeleted");
        }
    }
}
