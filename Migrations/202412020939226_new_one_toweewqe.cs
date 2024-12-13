namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_one_toweewqe : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.User", "IsProfileBlocked", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.User", "IsProfileBlocked");
        }
    }
}
