namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_attri : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Tour", "Description", c => c.Boolean(nullable: false));
            AlterColumn("dbo.TourReview", "Star", c => c.Single(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.TourReview", "Star", c => c.Int(nullable: false));
            DropColumn("dbo.Tour", "Description");
        }
    }
}
