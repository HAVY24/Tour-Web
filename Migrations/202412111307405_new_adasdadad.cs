namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_adasdadad : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.BlogPost", "Title", c => c.String(nullable: false));
            AlterColumn("dbo.BlogPost", "Image", c => c.String(nullable: false));
            AlterColumn("dbo.BlogPost", "Content", c => c.String(nullable: false));
            AlterColumn("dbo.BlogPost", "Owner", c => c.String(nullable: false));
            AlterColumn("dbo.BlogPost", "Status", c => c.String(nullable: false));
            AlterColumn("dbo.Booking", "Status", c => c.String(nullable: false));
            AlterColumn("dbo.Contact", "Name", c => c.String(nullable: false));
            AlterColumn("dbo.Contact", "Phone", c => c.String(nullable: false));
            AlterColumn("dbo.Contact", "Email", c => c.String(nullable: false));
            AlterColumn("dbo.Payment", "PaymentMethod", c => c.String(nullable: false));
            AlterColumn("dbo.Payment", "PaymentStatus", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Payment", "PaymentStatus", c => c.String());
            AlterColumn("dbo.Payment", "PaymentMethod", c => c.String());
            AlterColumn("dbo.Contact", "Email", c => c.String());
            AlterColumn("dbo.Contact", "Phone", c => c.String());
            AlterColumn("dbo.Contact", "Name", c => c.String());
            AlterColumn("dbo.Booking", "Status", c => c.String());
            AlterColumn("dbo.BlogPost", "Status", c => c.String());
            AlterColumn("dbo.BlogPost", "Owner", c => c.String());
            AlterColumn("dbo.BlogPost", "Content", c => c.String());
            AlterColumn("dbo.BlogPost", "Image", c => c.String());
            AlterColumn("dbo.BlogPost", "Title", c => c.String());
        }
    }
}
