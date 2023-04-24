using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Orders.ProductOrders;

public class ProductOrderRegister
{
    [Required]
    public ulong ProductId { get; set; }
    [Required]
    public uint Quantity { get; set; }

}
