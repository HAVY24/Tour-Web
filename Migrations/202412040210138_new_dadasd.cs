namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_dadasd : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Payment", "PaymentAmount", c => c.Single(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Payment", "PaymentAmount", c => c.String());
        }
    }
}
