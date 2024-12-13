namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_oeweqe : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Tour", "DeletedAt", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Tour", "DeletedAt");
        }
    }
}
