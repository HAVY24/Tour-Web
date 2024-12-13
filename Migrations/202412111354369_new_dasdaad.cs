namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_dasdaad : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.BlogPost", "Status", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.BlogPost", "Status", c => c.String(nullable: false));
        }
    }
}
