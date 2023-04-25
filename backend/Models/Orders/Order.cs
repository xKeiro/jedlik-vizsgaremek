using backend.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Orders;

public class Order : BaseModel
{
    [Required]
    public required User User { get; set; }
    [Required]
    public required Shipper Shipper { get; set; }
    [Required]
    [MinLength(1)]
    public ICollection<ProductOrder> ProductOrders { get; set; } = null!;
    [Required]
    [EnumDataType(typeof(OrderStatus))]
    [MinLength(1), MaxLength(25)]
    public OrderStatus Status { get; set; } = OrderStatus.InProgress;
    [Required]
    public DateTime OrderDate { get; set; } = DateTime.Now;
    [Required]
    [MinLength(3), MaxLength(50)]
    public required string Street { get; set; }
    [Required]
    [MinLength(3), MaxLength(50)]
    public required string City { get; set; }
    [Required]
    [MinLength(3), MaxLength(50)]
    public required string Region { get; set; }
    [Required]
    [MaxLength(10)]
    public required string PostalCode { get; set; }
    [Required]
    public required CountryWithVat CountryWithVat { get; set; }
    public string Country => CountryWithVat.Country;
    public byte Vat => CountryWithVat.Vat;
    public decimal OrderTotal => ProductOrders.Sum(po => po.TotalPrice);
    public decimal OrderTotalWithVat => OrderTotal * (1 + ((decimal)Vat / 100));
    public decimal OrderTotalWithShipping => OrderTotalWithVat + Shipper.Price;
    public decimal Profit
        => OrderTotal - ProductOrders.Sum(po => po.CostPrice * po.Quantity);

}
