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
    public required ICollection<ProductOrderRegister> ProductOrders { get; set; }

}
