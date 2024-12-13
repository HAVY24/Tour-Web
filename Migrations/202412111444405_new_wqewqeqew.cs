namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_wqewqeqew : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Payment", "PaymentMethod", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Payment", "PaymentMethod", c => c.String(nullable: false));
        }
    }
}
