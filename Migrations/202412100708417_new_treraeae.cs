namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_treraeae : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.User", "VerificationCode", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.User", "VerificationCode");
        }
    }
}
