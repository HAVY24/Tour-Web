namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_dasdadad : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BlogPost", "Status", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.BlogPost", "Status");
        }
    }
}
