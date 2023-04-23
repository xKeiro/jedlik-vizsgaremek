using backend.Dtos.Orders.ProductOrders;
using backend.Enums;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Orders;

public class OrderRegister
{
    [Required]
    public ulong ShipperId { get; set; }
    [Required]
    [MinLength(1)]
    public ICollection<ProductOrderPublic> ProductOrders { get; set; } = null!;
    [Required]
    [EnumDataType(typeof(OrderStatus))]
    [MinLength(1), MaxLength(25)]
    public required OrderStatus Status { get; set; }
    [Required]
    public DateTime OrderDate { get; set; } = DateTime.Now;
}
