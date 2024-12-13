namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_ewaeae : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BlogPost", "IsAccepted", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.BlogPost", "IsAccepted");
        }
    }
}
