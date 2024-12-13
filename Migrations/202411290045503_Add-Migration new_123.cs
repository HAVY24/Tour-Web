namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddMigrationnew_123 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BlogPost", "IsAdminPost", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.BlogPost", "IsAdminPost");
        }
    }
}
