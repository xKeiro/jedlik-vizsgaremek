using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Orders.ProductOrders;

public class ProductOrderAdmin:ProductOrderPublic
{
    [Required]
    [Precision(18, 2)]
    public decimal CostPrice { get; set; }
}
