using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddCostPriceToProductOrderAndAddUniqueConstraintOnProductSupplier : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ProductSuppliers_SupplierId",
                table: "ProductSuppliers");

            migrationBuilder.AddColumn<decimal>(
                name: "CostPrice",
                table: "ProductOrders",
                type: "decimal(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateIndex(
                name: "IX_ProductSuppliers_SupplierId_ProductId",
                table: "ProductSuppliers",
                columns: new[] { "SupplierId", "ProductId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ProductSuppliers_SupplierId_ProductId",
                table: "ProductSuppliers");

            migrationBuilder.DropColumn(
                name: "CostPrice",
                table: "ProductOrders");

            migrationBuilder.CreateIndex(
                name: "IX_ProductSuppliers_SupplierId",
                table: "ProductSuppliers",
                column: "SupplierId");
        }
    }
}
