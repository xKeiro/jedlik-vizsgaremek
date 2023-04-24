using backend.Enums;
using System.ComponentModel.DataAnnotations;
using backend.Dtos.Users;
using backend.Dtos.Orders.OrderAddresses;
using backend.Dtos.Orders.ProductOrders;

namespace backend.Dtos.Orders;

public class OrderAdmin
{
    [Required]
    public required UserPublic User { get; set; }
    [Required]
    public required OrderAddressPublic OrderAddress { get; set; }
    [Required]
    public required ulong ShipperId { get; set; }
    [Required]
    [MinLength(1)]
    public required ICollection<ProductOrderAdmin> ProductOrders { get; set; }
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
    [Required]
    public required decimal Profit { get; set; }
}
