namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_dasdasdasda : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Booking", "Status", c => c.String());
            AlterColumn("dbo.Payment", "PaymentStatus", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Payment", "PaymentStatus", c => c.String(nullable: false));
            AlterColumn("dbo.Booking", "Status", c => c.String(nullable: false));
        }
    }
}
