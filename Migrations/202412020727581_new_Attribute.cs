namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_Attribute : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.User", "IsBanned", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.User", "IsBanned");
        }
    }
}
