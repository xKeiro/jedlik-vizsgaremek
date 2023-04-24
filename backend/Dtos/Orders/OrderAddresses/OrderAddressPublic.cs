using backend.Dtos.Addresses;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Orders.OrderAddresses;

public class OrderAddressPublic
{
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
    [MinLength(3), MaxLength(100)]
    public required string Country { get; set; }
}
