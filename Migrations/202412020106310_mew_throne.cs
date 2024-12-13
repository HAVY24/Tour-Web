namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class mew_throne : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Tour", "IsDeleted", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Tour", "IsDeleted");
        }
    }
}
