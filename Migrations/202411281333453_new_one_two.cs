namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_one_two : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.UserProfile", "PostalCode", c => c.Int());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.UserProfile", "PostalCode", c => c.Int(nullable: false));
        }
    }
}
