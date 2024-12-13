namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_thing : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.User", "DeletedAt", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.User", "DeletedAt");
        }
    }
}
