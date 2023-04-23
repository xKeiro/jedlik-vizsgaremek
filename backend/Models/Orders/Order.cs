using backend.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Orders;

public class Order : BaseModel
{
    [Required]
    public required User User { get; set; }
    [Required]
    [ForeignKey("OrderAddressId")]
    public required OrderAddress OrderAddress { get; set; }
    [Required]
    public required Shipper Shipper { get; set; }
    [Required]
    [MinLength(1)]
    public ICollection<ProductOrder> ProductOrders { get; set; } = null!;
    [Required]
    [EnumDataType(typeof(OrderStatus))]
    [MinLength(1), MaxLength(25)]
    public required OrderStatus Status { get; set; }
    [Required]
    public DateTime OrderDate { get; set; } = DateTime.Now;
    public byte Vat => OrderAddress.CountryWithVat.Vat;
    public decimal OrderTotal => ProductOrders.Sum(po => po.TotalPrice);
    public decimal OrderTotalWithVat => OrderTotal * (1 + ((decimal)Vat / 100));
    public decimal OrderTotalWithShipping => OrderTotalWithVat + Shipper.Price;

}
