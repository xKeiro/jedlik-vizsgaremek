using backend.Models.Products;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Orders;

public class ProductOrder : BaseModel
{
    [Required]
    public required Product Product { get; set; }
    [Required]
    [Precision(18, 2)]
    public required decimal BasePrice { get; set; }
    [Required]
    [Precision(18, 2)]
    public required decimal CostPrice { get; set; }
    [Required]
    public required uint Quantity { get; set; }
    [Required]
    public required byte Discount { get; set; }
    public decimal TotalPrice => BasePrice * Quantity * (1 - (Discount / 100));
    [Required]
    public Order Order { get; set; } = null!;

}
