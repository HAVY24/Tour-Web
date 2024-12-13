namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_Model : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.PaymentCard",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Type = c.String(),
                        CardholderName = c.String(),
                        Last4Digits = c.Int(nullable: false),
                        ExpirationDate = c.DateTime(),
                        BillingAddress = c.String(),
                        CardToken = c.String(),
                        CreatedAt = c.DateTime(),
                        UpdatedAt = c.DateTime(),
                        User_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.User", t => t.User_Id)
                .Index(t => t.User_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PaymentCard", "User_Id", "dbo.User");
            DropIndex("dbo.PaymentCard", new[] { "User_Id" });
            DropTable("dbo.PaymentCard");
        }
    }
}
