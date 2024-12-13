namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_oieq : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Tour", "User_Id", "dbo.User");
            DropIndex("dbo.Tour", new[] { "User_Id" });
            RenameColumn(table: "dbo.Tour", name: "User_Id", newName: "UserId");
            AlterColumn("dbo.Tour", "UserId", c => c.Int(nullable: false));
            CreateIndex("dbo.Tour", "UserId");
            AddForeignKey("dbo.Tour", "UserId", "dbo.User", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Tour", "UserId", "dbo.User");
            DropIndex("dbo.Tour", new[] { "UserId" });
            AlterColumn("dbo.Tour", "UserId", c => c.Int());
            RenameColumn(table: "dbo.Tour", name: "UserId", newName: "User_Id");
            CreateIndex("dbo.Tour", "User_Id");
            AddForeignKey("dbo.Tour", "User_Id", "dbo.User", "Id");
        }
    }
}
