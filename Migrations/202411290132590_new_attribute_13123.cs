namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_attribute_13123 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BlogPost", "DeletedAt", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.BlogPost", "DeletedAt");
        }
    }
}
