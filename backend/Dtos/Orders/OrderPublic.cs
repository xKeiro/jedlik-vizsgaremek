using backend.Enums;
using backend.Models.Orders;
using backend.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using backend.Dtos.Users;
using backend.Dtos.Orders.OrderAddresses;
using backend.Dtos.Orders.ProductOrders;

namespace backend.Dtos.Orders;

public class OrderPublic
{
    [Required]
    public required UserPublic User { get; set; }
    [Required]
    public required OrderAddressPublic OrderAddress { get; set; }
    [Required]
    public required ulong ShipperId { get; set; }
    [Required]
    [MinLength(1)]
    public ICollection<ProductOrderPublic> ProductOrders { get; set; } = null!;
    [Required]
    [EnumDataType(typeof(OrderStatus))]
    [MinLength(1), MaxLength(25)]
    public required OrderStatus Status { get; set; }
    [Required]
    public DateTime OrderDate { get; set; } = DateTime.Now;
    [Required]
    public required byte Vat { get; set; }
    [Required]
    public required decimal OrderTotal { get; set; }
    [Required]
    public required decimal OrderTotalWithVat { get; set; }
    [Required]
    public required decimal OrderTotalWithShipping { get; set; }
}
