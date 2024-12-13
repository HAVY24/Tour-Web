namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_treraeae31313 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.User", "VerificationCodeExpiration", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.User", "VerificationCodeExpiration", c => c.String());
        }
    }
}
