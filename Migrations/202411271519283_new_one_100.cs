namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_one_100 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Payment", "IsDeleted", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Payment", "IsDeleted");
        }
    }
}
