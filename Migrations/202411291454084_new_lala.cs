namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_lala : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TourPackage", "Activities", c => c.String());
            DropColumn("dbo.TourPackage", "Activity");
        }
        
        public override void Down()
        {
            AddColumn("dbo.TourPackage", "Activity", c => c.String());
            DropColumn("dbo.TourPackage", "Activities");
        }
    }
}
