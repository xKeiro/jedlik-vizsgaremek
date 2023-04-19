using backend.Enums;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Orders;

public class Order : BaseModel
{
    [Required]
    public required User User { get; set; }
    [Required]
    public required Shipper Shipper { get; set; }
    [Required]
    [MinLength(1)]
    public required IQueryable<ProductOrder> ProductOrders { get; set; }
    [Required]
    [Range(0, 100)]
    public required byte Vat { get; set; }
    [Required]
    [EnumDataType(typeof(OrderStatus))]
    [MinLength(1), MaxLength(25)]
    public required OrderStatus Status { get; set; }
    [Required]
    public DateTime OrderDate { get; set; } = DateTime.Now;
    public decimal OrderTotal => ProductOrders.Sum(po => po.TotalPrice);
}
