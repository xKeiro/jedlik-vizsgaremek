using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddCountryWithVat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Vat",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "OrderAddresses");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "Addresses");

            migrationBuilder.AddColumn<decimal>(
                name: "CountryWithVatId",
                table: "Orders",
                type: "decimal(20,0)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "CountryWithVatId",
                table: "OrderAddresses",
                type: "decimal(20,0)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "CountryWithVatId",
                table: "Addresses",
                type: "decimal(20,0)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateTable(
                name: "CountriesWithVat",
                columns: table => new
                {
                    Id = table.Column<decimal>(type: "decimal(20,0)", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Country = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Vat = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CountriesWithVat", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CountryWithVatId",
                table: "Orders",
                column: "CountryWithVatId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderAddresses_CountryWithVatId",
                table: "OrderAddresses",
                column: "CountryWithVatId");

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_CountryWithVatId",
                table: "Addresses",
                column: "CountryWithVatId");

            migrationBuilder.CreateIndex(
                name: "IX_CountriesWithVat_Country",
                table: "CountriesWithVat",
                column: "Country",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_CountriesWithVat_CountryWithVatId",
                table: "Addresses",
                column: "CountryWithVatId",
                principalTable: "CountriesWithVat",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderAddresses_CountriesWithVat_CountryWithVatId",
                table: "OrderAddresses",
                column: "CountryWithVatId",
                principalTable: "CountriesWithVat",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_CountriesWithVat_CountryWithVatId",
                table: "Orders",
                column: "CountryWithVatId",
                principalTable: "CountriesWithVat",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_CountriesWithVat_CountryWithVatId",
                table: "Addresses");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderAddresses_CountriesWithVat_CountryWithVatId",
                table: "OrderAddresses");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_CountriesWithVat_CountryWithVatId",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "CountriesWithVat");

            migrationBuilder.DropIndex(
                name: "IX_Orders_CountryWithVatId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_OrderAddresses_CountryWithVatId",
                table: "OrderAddresses");

            migrationBuilder.DropIndex(
                name: "IX_Addresses_CountryWithVatId",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "CountryWithVatId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CountryWithVatId",
                table: "OrderAddresses");

            migrationBuilder.DropColumn(
                name: "CountryWithVatId",
                table: "Addresses");

            migrationBuilder.AddColumn<byte>(
                name: "Vat",
                table: "Orders",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.AddColumn<int>(
                name: "Country",
                table: "OrderAddresses",
                type: "int",
                maxLength: 4,
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Addresses",
                type: "nvarchar(4)",
                maxLength: 4,
                nullable: false,
                defaultValue: "");
        }
    }
}
