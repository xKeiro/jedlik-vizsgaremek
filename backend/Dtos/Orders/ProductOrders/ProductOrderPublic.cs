using backend.Dtos.Products;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Orders.ProductOrders;

public class ProductOrderPublic
{
    [Required]
    public required ProductPublic Product { get; set; }
    [Required]
    [Precision(18, 2)]
    public required decimal BasePrice { get; set; }
    [Required]
    public required uint Quantity { get; set; }
    [Required]
    public required byte Discount { get; set; }
    public required decimal TotalPrice { get; set; }
}
