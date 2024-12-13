namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_attribute_1312313212 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BlogPost", "IsDeleted", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.BlogPost", "IsDeleted");
        }
    }
}
