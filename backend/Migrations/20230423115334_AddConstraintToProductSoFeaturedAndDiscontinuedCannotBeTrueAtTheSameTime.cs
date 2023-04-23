using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddConstraintToProductSoFeaturedAndDiscontinuedCannotBeTrueAtTheSameTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddCheckConstraint(
                name: "CK_Products_Featured_Discontinued",
                table: "Products",
                sql: "NOT (Featured=1 AND Discontinued=1)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_Products_Featured_Discontinued",
                table: "Products");
        }
    }
}
