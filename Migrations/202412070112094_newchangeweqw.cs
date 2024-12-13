namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class newchangeweqw : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.BlogPost", "IsAccepted");
        }
        
        public override void Down()
        {
            AddColumn("dbo.BlogPost", "IsAccepted", c => c.Boolean(nullable: false));
        }
    }
}
