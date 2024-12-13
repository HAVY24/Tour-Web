namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_attri124 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Tour", "Description", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Tour", "Description", c => c.Boolean(nullable: false));
        }
    }
}
