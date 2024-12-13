namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_schema : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Schedule", "TourPackage_Id", "dbo.TourPackage");
            DropForeignKey("dbo.TourReview", "TourPackage_Id", "dbo.TourPackage");
            DropForeignKey("dbo.Voucher", "TourPackage_Id", "dbo.TourPackage");
            DropIndex("dbo.Schedule", new[] { "TourPackage_Id" });
            DropIndex("dbo.TourReview", new[] { "TourPackage_Id" });
            DropIndex("dbo.Voucher", new[] { "TourPackage_Id" });
            RenameColumn(table: "dbo.Schedule", name: "TourPackage_Id", newName: "TourPackageId");
            RenameColumn(table: "dbo.TourReview", name: "TourPackage_Id", newName: "TourPackageId");
            RenameColumn(table: "dbo.Voucher", name: "TourPackage_Id", newName: "TourPackageId");
            AlterColumn("dbo.Schedule", "TourPackageId", c => c.Int(nullable: false));
            AlterColumn("dbo.TourReview", "TourPackageId", c => c.Int(nullable: false));
            AlterColumn("dbo.Voucher", "TourPackageId", c => c.Int(nullable: false));
            CreateIndex("dbo.Schedule", "TourPackageId");
            CreateIndex("dbo.TourReview", "TourPackageId");
            CreateIndex("dbo.Voucher", "TourPackageId");
            AddForeignKey("dbo.Schedule", "TourPackageId", "dbo.TourPackage", "Id", cascadeDelete: true);
            AddForeignKey("dbo.TourReview", "TourPackageId", "dbo.TourPackage", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Voucher", "TourPackageId", "dbo.TourPackage", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Voucher", "TourPackageId", "dbo.TourPackage");
            DropForeignKey("dbo.TourReview", "TourPackageId", "dbo.TourPackage");
            DropForeignKey("dbo.Schedule", "TourPackageId", "dbo.TourPackage");
            DropIndex("dbo.Voucher", new[] { "TourPackageId" });
            DropIndex("dbo.TourReview", new[] { "TourPackageId" });
            DropIndex("dbo.Schedule", new[] { "TourPackageId" });
            AlterColumn("dbo.Voucher", "TourPackageId", c => c.Int());
            AlterColumn("dbo.TourReview", "TourPackageId", c => c.Int());
            AlterColumn("dbo.Schedule", "TourPackageId", c => c.Int());
            RenameColumn(table: "dbo.Voucher", name: "TourPackageId", newName: "TourPackage_Id");
            RenameColumn(table: "dbo.TourReview", name: "TourPackageId", newName: "TourPackage_Id");
            RenameColumn(table: "dbo.Schedule", name: "TourPackageId", newName: "TourPackage_Id");
            CreateIndex("dbo.Voucher", "TourPackage_Id");
            CreateIndex("dbo.TourReview", "TourPackage_Id");
            CreateIndex("dbo.Schedule", "TourPackage_Id");
            AddForeignKey("dbo.Voucher", "TourPackage_Id", "dbo.TourPackage", "Id");
            AddForeignKey("dbo.TourReview", "TourPackage_Id", "dbo.TourPackage", "Id");
            AddForeignKey("dbo.Schedule", "TourPackage_Id", "dbo.TourPackage", "Id");
        }
    }
}
