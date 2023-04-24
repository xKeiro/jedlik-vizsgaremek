using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class RemoveCountryWithVatFromOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_CountriesWithVat_CountryWithVatId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_CountryWithVatId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CountryWithVatId",
                table: "Orders");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "CountryWithVatId",
                table: "Orders",
                type: "decimal(20,0)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CountryWithVatId",
                table: "Orders",
                column: "CountryWithVatId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_CountriesWithVat_CountryWithVatId",
                table: "Orders",
                column: "CountryWithVatId",
                principalTable: "CountriesWithVat",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
